// src/services/githubService.js
import axios from "axios";

const BASE_URL = "https://api.github.com";

function getAuthHeaders() {
  const token = import.meta.env.VITE_APP_GITHUB_API_KEY;
  return token ? { Authorization: `token ${token}` } : {};
}

/**
 * fetchUserData - fetch user details by username
 * @param {string} username
 * @returns {Promise<object>} user data
 */
export async function fetchUserData(username) {
  if (!username) throw new Error("username is required");
  const url = `${BASE_URL}/users/${encodeURIComponent(username)}`;
  const response = await axios.get(url, {
    headers: {
      Accept: "application/vnd.github+json",
      ...getAuthHeaders(),
    },
  });
  return response.data;
}

// Additional helper for advanced search (will be used in Task 2)
export async function searchUsers(query, page = 1, per_page = 30) {
  const url = `${BASE_URL}/search/users`;
  const q = encodeURIComponent(query);
  const response = await axios.get(`${url}?q=${q}&page=${page}&per_page=${per_page}`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...getAuthHeaders(),
    },
  });
  return response.data;
}
