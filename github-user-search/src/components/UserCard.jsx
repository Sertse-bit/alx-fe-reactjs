// src/components/UserCard.jsx
import React from "react";

export default function UserCard({ user }) {
  if (!user) return null;
  return (
    <div className="max-w-md p-4 rounded-lg shadow-md bg-white">
      <div className="flex items-center gap-4">
        <img src={user.avatar_url} alt={`${user.login} avatar`} className="w-20 h-20 rounded-full" />
        <div>
          <h2 className="text-lg font-semibold">{user.name || user.login}</h2>
          <p className="text-sm text-gray-600">{user.login}</p>
          {user.location && <p className="text-sm">📍 {user.location}</p>}
          <a href={user.html_url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-blue-600 underline">
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
