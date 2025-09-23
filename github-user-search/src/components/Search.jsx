// src/components/Search.jsx
import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState([]); // store fetched users
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    if (!username.trim()) return;
    setStatus("loading");
    try {
      const data = await fetchUserData(username.trim());
      // Add to results (newest first) and dedupe by login
      setResults(prev => {
        const without = prev.filter(u => u.login.toLowerCase() !== data.login.toLowerCase());
        return [data, ...without];
      });
      setStatus("success");
      setUsername("");
    } catch (err) {
      console.error(err);
      setErrorMsg("Looks like we cant find the user");
      setStatus("error");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Search GitHub username (e.g. octocat)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Search
        </button>
      </form>

      <div className="mt-6">
        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p className="text-red-600">{errorMsg}</p>}

        <div className="space-y-4">
          {results.length > 0 ? (
            results.map((user) => (
              <div key={user.login} className="max-w-md p-4 rounded-lg shadow-md bg-white">
                <div className="flex items-center gap-4">
                  {/* avatar_url, login and img are present here */}
                  <img
                    src={user.avatar_url}
                    alt={`${user.login} avatar`}
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{user.name || user.login}</h2>
                    <p className="text-sm text-gray-600">@{user.login}</p>
                    {user.location && <p className="text-sm">📍 {user.location}</p>}
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-blue-600 underline"
                    >
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            status === "idle" && <p>No results yet. Try searching for a username.</p>
          )}
        </div>
      </div>
    </div>
  );
}
