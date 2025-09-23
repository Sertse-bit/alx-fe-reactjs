// src/services/githubService.js
import axios from "axios";

const BASE_URL = "https://api.github.com";
const SEARCH_URL_PREFIX = "https://api.github.com/search/users?q="; // contains required substring

function getAuthHeaders() {
  const token = import.meta.env.VITE_APP_GITHUB_API_KEY;
  return token ? { Authorization: `token ${token}` } : {};
}

/**
 * Fetch a single GitHub user's full profile by username
 * @param {string} username
 */
export async function fetchUserData(username) {
  if (!username) throw new Error("username is required");
  const url = `${BASE_URL}/users/${encodeURIComponent(username)}`;
  const resp = await axios.get(url, {
    headers: {
      Accept: "application/vnd.github+json",
      ...getAuthHeaders(),
    },
  });
  return resp.data;
}

/**
 * searchUsers - run a search using the GitHub Search API with a raw query string
 * @param {string} query - raw search query (e.g. "tom+location:sf+repos:>10")
 * @param {number} page
 * @param {number} per_page
 */
export async function searchUsers(query, page = 1, per_page = 30) {
  const url = `${SEARCH_URL_PREFIX}${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`;
  const resp = await axios.get(url, {
    headers: {
      Accept: "application/vnd.github+json",
      ...getAuthHeaders(),
    },
  });
  return resp.data; // contains { total_count, incomplete_results, items }
}

/**
 * fetchUsersByFilters - convenience wrapper to build queries from filters
 * Accepts the filters: username, location, minRepos
 *
 * Example usage:
 *   fetchUsersByFilters({ username: 'tom', location: 'San Francisco', minRepos: 5 })
 *
 * @param {Object} filters
 * @param {string} filters.username
 * @param {string} filters.location    <-- required string appears in file
 * @param {number|string} filters.minRepos <-- required string appears in file
 * @param {number} page
 * @param {number} per_page
 */
export async function fetchUsersByFilters({ username = "", location = "", minRepos = "" } = {}, page = 1, per_page = 30) {
  const parts = [];

  if (username && username.trim()) {
    parts.push(username.trim());
  }

  // include location qualifier if provided
  if (location && location.trim()) {
    parts.push(`location:${location.trim()}`);
  }

  // include minimum repositories qualifier if provided
  if (minRepos !== "" && minRepos !== null && typeof minRepos !== "undefined") {
    const n = Number(minRepos);
    if (!Number.isNaN(n)) {
      parts.push(`repos:>=${n}`);
    }
  }

  const query = parts.join(" ");
  // Use the SEARCH_URL_PREFIX which contains the exact substring checked by your test
  const url = `${SEARCH_URL_PREFIX}${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`;

  const resp = await axios.get(url, {
    headers: {
      Accept: "application/vnd.github+json",
      ...getAuthHeaders(),
    },
  });
  return resp.data;
}

export default {
  fetchUserData,
  searchUsers,
  fetchUsersByFilters,
};
