import React, { useState } from "react";
import { uid } from "../utils/storage";

export default function NoteForm({ state, setState }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title && !text) return;

    const newNote = {
      id: uid(),
      title: title.trim() || "Untitled",
      text: text.trim(),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      pinned: false,
      archived: false,
      trashed: false,
      createdAt: new Date().toISOString(),
    };

    setState((prev) => ({ ...prev, notes: [newNote, ...prev.notes] }));
    setTitle("");
    setText("");
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-purple-100 p-4 rounded shadow">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border-purple-500 border rounded mb-2 bg-white"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Take a note..."
        className="w-full p-2 border rounded mb-2 bg-white border-purple-500"
        rows={3}
      />
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Comma-separated tags"
        className="w-full p-2 border rounded mb-2 bg-white border-purple-500"
      />
      <button
        type="submit"
        className="px-3 py-1 mt-5 bg-blue-500 hover:cursor-pointer hover:bg-blue-600 text-white rounded w-full"
      >
        Add Note
      </button>
    </form>
  );
}
