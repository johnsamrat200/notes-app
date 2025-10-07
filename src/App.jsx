import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { load, save } from "./utils/storage";

export default function App() {
  const [state, setState] = useState(() => load());
  const location = useLocation();

  useEffect(() => save(state), [state]);

  return (
    <div>
      <Header appState={state} />
      <main className="container mx-auto p-4">
        <div className="mb-4 flex gap-3">
          <Link
            to="/"
            className={`px-3 py-1 rounded ${
              location.pathname === "/" ? "bg-purple-400 text-white shadow-lg" : ""
            }`}
          >
            Notes
          </Link>
          <Link
            to="/archive"
            className={`px-3 py-1 rounded ${
              location.pathname === "/archive" ? "bg-blue-400 text-white shadow-lg" : ""
            }`}
          >
            Archive
          </Link>
          <Link
            to="/trash"
            className={`px-3 py-1 rounded ${
              location.pathname === "/trash" ? "bg-red-400 text-white shadow-lg" : ""
            }`}
          >
            Trash
          </Link>
        </div>
        <Outlet context={{ state, setState }} />
      </main>
    </div>
  );
}
