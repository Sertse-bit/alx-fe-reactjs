// src/components/AdvancedSearch.jsx
import React, { useState } from "react";
import { searchUsers, fetchUserData } from "../services/githubService";

function buildQuery({ username, location, minRepos }) {
  // username (if provided) becomes part of q; we combine filters.
  // GitHub Search qualifiers: location:, repos:>=N
  const parts = [];

  if (username) parts.push(username);
  if (location) parts.push(`location:${location}`);
  if (minRepos) parts.push(`repos:>=${minRepos}`);

  return parts.join(" ");
}

export default function AdvancedSearch() {
  const [filters, setFilters] = useState({ username: "", location: "", minRepos: "" });
  const [results, setResults] = useState([]); // list of users (from search API)
  const [detailed, setDetailed] = useState({}); // map login -> user detail (if fetched)
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");

  async function doSearch(newSearch = false) {
    if (newSearch) {
      setPage(1);
      setResults([]);
      setDetailed({});
    }
    const query = buildQuery(filters);
    if (!query.trim()) return;
    setStatus("loading");
    try {
      const data = await searchUsers(query, newSearch ? 1 : page, perPage);
      // data.items are basic user objects
      setTotalCount(data.total_count || 0);
      const merged = newSearch ? data.items : [...results, ...data.items];
      setResults(merged);
      setPage((p) => (newSearch ? 2 : p + 1));

      // Fetch details for visible page users (to show repo count & location)
      // We'll fetch details for items returned on this call only:
      const usersToFetch = data.items || [];
      const detailPromises = usersToFetch.map((u) =>
        fetchUserData(u.login).then((d) => ({ login: u.login, data: d })).catch(() => null)
      );
      const detailResults = await Promise.all(detailPromises);
      const detailMap = { ...detailed };
      detailResults.forEach((dr) => {
        if (dr && dr.login) detailMap[dr.login] = dr.data;
      });
      setDetailed(detailMap);

      setStatus("idle");
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to search users. Check your network or API limits.");
      setStatus("error");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          doSearch(true);
        }}
        className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
      >
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Username / keyword</label>
          <input
            className="w-full p-2 border rounded"
            value={filters.username}
            onChange={(e) => setFilters((f) => ({ ...f, username: e.target.value }))}
            placeholder="e.g. tom, john, react"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            className="w-full p-2 border rounded"
            value={filters.location}
            onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
            placeholder="e.g. San Francisco"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Min Repos</label>
          <input
            className="w-full p-2 border rounded"
            value={filters.minRepos}
            onChange={(e) => setFilters((f) => ({ ...f, minRepos: e.target.value }))}
            type="number"
            min="0"
            placeholder="e.g. 10"
          />
        </div>

        <div className="md:col-span-4">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
        </div>
      </form>

      <div className="mt-6">
        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p className="text-red-600">{errorMsg}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {results.map((u) => {
            const det = detailed[u.login];
            return (
              <div key={u.login} className="p-3 bg-white rounded shadow">
                <div className="flex items-center gap-3">
                  <img src={u.avatar_url} alt={u.login} className="w-12 h-12 rounded-full" />
                  <div>
                    <a href={u.html_url} target="_blank" rel="noreferrer" className="font-medium text-blue-600">
                      {u.login}
                    </a>
                    {det && det.name && <div className="text-sm">{det.name}</div>}
                    <div className="text-xs text-gray-600">
                      {det ? `Repos: ${det.public_repos}` : "Repos: (loading...)"}
                      {det && det.location ? ` • ${det.location}` : ""}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4">
          {results.length === 0 && status === "idle" && <p>No results yet. Try a search.</p>}
          {results.length < totalCount && results.length > 0 && (
            <button
              onClick={() => doSearch(false)}
              className="px-4 py-2 bg-gray-800 text-white rounded mt-4"
            >
              Load more
            </button>
          )}

          {results.length >= totalCount && totalCount > 0 && <p className="mt-2 text-sm">End of results</p>}
        </div>
      </div>
    </div>
  );
}
