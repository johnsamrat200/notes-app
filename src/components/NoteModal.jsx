import React, { useState, useEffect } from "react";

export default function NoteModal({ note, onClose, state, setState }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");

  // ✅ Pre-fill fields when modal opens
  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setText(note.text || "");
      setTags((note.tags || []).join(", "));
    }
  }, [note]);

  // ✅ Save and update localStorage
  const handleSave = () => {
    const updatedNote = {
      ...note,
      title: title.trim(),
      text: text.trim(),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
    };

    const updatedNotes = state.notes.map((n) =>
      n.id === note.id ? updatedNote : n
    );

    setState((s) => ({ ...s, notes: updatedNotes }));
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    onClose();
  };

  // ✅ Restore from trash
  const handleRestore = () => {
    const updatedNotes = state.notes.map((n) =>
      n.id === note.id ? { ...n, trashed: false } : n
    );

    setState((s) => ({ ...s, notes: updatedNotes }));
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    onClose();
  };

  // ✅ Delete permanently
  const handleDeleteForever = () => {
    const updatedNotes = state.notes.filter((n) => n.id !== note.id);
    setState((s) => ({ ...s, notes: updatedNotes }));
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    onClose();
  };

  if (!note) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-purple-200 p-6 rounded-2xl shadow-xl w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {note.trashed ? "Trashed Note" : "Edit Note"}
        </h2>

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          className="w-full p-3 border bg-white border-purple-500 rounded-lg mb-3 text-gray-800"
        />

        {/* Description */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your note..."
          rows={6}
          className="w-full p-3 border border-purple-500 bg-white rounded-lg mb-3 resize-none text-gray-700"
        />

        {/* Tags */}
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Add tags (comma separated)"
          className="w-full p-3 border border-purple-500 bg-white rounded-lg mb-5 text-gray-700"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          {!note.trashed && (
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 hover:cursor-pointer rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          )}

          {note.trashed && (
            <>
              <button
                onClick={handleRestore}
                className="border border-gray-400 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Restore
              </button>
              <button
                onClick={handleDeleteForever}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete Forever
              </button>
            </>
          )}

          <button
            onClick={onClose}
            className=" bg-fuchsia-500 text-white border-gray-400  px-4 py-2 rounded-lg hover:bg-fuchsia-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
