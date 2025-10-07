import React from "react";

export default function Header({ appState }) {
  return (
    <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 px-4 shadow sticky top-0">
      <div className="container mx-auto flex justify-between items-center ">
        <h1 className="text-xl font-semibold">Notes App</h1>
        <span className="text-sm border rounded-4xl px-2 py-1">
          {appState.notes.length} Notes
        </span>
      </div>
    </header>
  );
}
