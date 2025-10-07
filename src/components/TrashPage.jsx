import React from "react";
import { useOutletContext } from "react-router-dom";

export default function TrashPage() {
  const { state, setState } = useOutletContext();
  const trashed = state.notes.filter((n) => n.trashed);

  const restore = (id) =>
    setState((s) => ({
      ...s,
      notes: s.notes.map((n) => (n.id === id ? { ...n, trashed: false } : n)),
    }));

  const remove = (id) =>
    setState((s) => ({
      ...s,
      notes: s.notes.filter((n) => n.id !== id),
    }));

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Trash</h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {trashed.length === 0 && (
          <div className="p-6 col-span-full text-gray-500 text-center bg-gray-50 rounded">
            Trash is empty.
          </div>
        )}

        {trashed.map((n) => (
          <div
            key={n.id}
            className="bg-red-100 p-4 rounded-xl shadow hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            {/* Title */}
            <h3 className="font-semibold text-lg text-gray-800 break-words">
              {n.title}
            </h3>

            {/* Description (with ellipsis + wrap) */}
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

            {/* Action buttons */}
            <div className="flex gap-2 mt-4 ">
              <button
                onClick={() => restore(n.id)}
                className="flex-1 px-3 py-1  hover:cursor-pointer bg-white rounded-md hover:bg-fuchsia-200 text-gray-700 transition"
              >
                Restore
              </button>
              <button
                onClick={() => remove(n.id)}
                className="flex-1 px-3 py-1 bg-red-600 hover:cursor-pointer text-white rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
