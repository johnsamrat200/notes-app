import React from "react";
import { useOutletContext } from "react-router-dom";

export default function ArchivePage() {
  const { state, setState } = useOutletContext();
  const archived = state.notes.filter((n) => n.archived && !n.trashed);

  const restore = (id) =>
    setState((s) => ({
      ...s,
      notes: s.notes.map((n) =>
        n.id === id ? { ...n, archived: false } : n
      ),
    }));

  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Archive</h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        {archived.length === 0 && (
          <div className="p-6 col-span-full text-gray-500 text-center bg-gray-50 rounded">
            No archived notes.
          </div>
        )}

        {archived.map((n) => (
          <div
            key={n.id}
            className="bg-blue-100 rounded-xl shadow p-4 hover:shadow-lg transition-all duration-200"
          >
            {/* Title */}
            <h3 className="font-semibold text-lg text-gray-800 break-words">
              {n.title}
            </h3>

            {/* Description with ellipsis and wrap */}
            <p
              className="text-sm mt-2 text-gray-700 break-words overflow-hidden text-ellipsis line-clamp-4"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
              }}
            >
              {n.text}
            </p>

            {/* Tags (optional) */}
            {n.tags && n.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {n.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-purple-200 text-black-700 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Button */}
            <button
              onClick={() => restore(n.id)}
              className="mt-4 px-3 py-1 border hover:cursor-pointer border-gray-300 bg-purple-200 rounded-md hover:bg-purple-300 text-gray-700 transition"
            >
              Unarchive
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
