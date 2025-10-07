import React, { useState } from "react";
import NoteModal from "./NoteModal";

export default function NoteCard({ note, state, setState }) {
  const [open, setOpen] = useState(false);

  const togglePin = () =>
    setState((s) => ({
      ...s,
      notes: s.notes.map((n) =>
        n.id === note.id ? { ...n, pinned: !n.pinned } : n
      ),
    }));

  const archive = () =>
    setState((s) => ({
      ...s,
      notes: s.notes.map((n) =>
        n.id === note.id ? { ...n, archived: true } : n
      ),
    }));

  const trash = () =>
    setState((s) => ({
      ...s,
      notes: s.notes.map((n) =>
        n.id === note.id ? { ...n, trashed: true } : n
      ),
    }));

  return (
    <div className="bg-fuchsia-100 rounded-xl shadow p-4 hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="font-semibold text-lg text-gray-800 break-words">
            {note.title}
          </h3>

          {/* Description with ellipsis overflow */}
          <p
            className="text-sm mt-1 text-gray-700 break-words overflow-hidden text-ellipsis line-clamp-3"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {note.text}
          </p>

          {/* Tags */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {(note.tags || []).map((t, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 bg-blue-100 text-gray-700 rounded-full"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 text-lg text-gray-700 ml-3">
          <button
            onClick={togglePin}
            className="hover:cursor-pointer transition-transform hover:scale-110"
            title="Pin / Unpin"
          >
            📌
          </button>
          <button
            onClick={() => setOpen(true)}
            className="hover:cursor-pointer transition-transform hover:scale-110"
            title="View Note"
          >
            🔍
          </button>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={archive}
          className="text-sm px-3 py-1 shadow rounded bg-blue-100 hover:bg-blue-300 transition"
        >
          Archive
        </button>
        <button
          onClick={trash}
          className="text-sm px-3 py-1 shadow rounded bg-red-100 hover:bg-red-300 transition"
        >
          Trash
        </button>
      </div>

      {/* Modal */}
      {open && (
        <NoteModal
          note={note}
          onClose={() => setOpen(false)}
          state={state}
          setState={setState}
        />
      )}
    </div>
  );
}
