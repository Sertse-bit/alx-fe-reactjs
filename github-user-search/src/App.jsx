// src/App.jsx (replace content)
import React from "react";
import Search from "./components/Search";
import AdvancedSearch from "./components/AdvancedSearch";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-2xl font-bold">GitHub User Search</h1>
        </div>
      </header>

      <main className="py-8">
        <div className="max-w-5xl mx-auto">
          <Search />
          <hr className="my-6" />
          <AdvancedSearch />
        </div>
      </main>
    </div>
  );
}
