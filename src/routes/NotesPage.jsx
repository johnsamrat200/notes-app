import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import TagFilter from "../components/TagFilter";

export default function NotesPage() {
  const { state, setState } = useOutletContext();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);

  const visible = state.notes
    .filter((n) => !n.trashed && !n.archived)
    .filter(
      (n) =>
        !query ||
        n.title.toLowerCase().includes(query.toLowerCase()) ||
        n.text.toLowerCase().includes(query.toLowerCase())
    )
    .filter((n) => !activeTag || (n.tags || []).includes(activeTag))
    .sort(
      (a, b) =>
        (b.pinned - a.pinned) ||
        new Date(b.createdAt) - new Date(a.createdAt)
    );

  const allTags = Array.from(
    new Set(state.notes.flatMap((n) => n.tags || []))
  );

  return (
    <div className="grid md:grid-cols-3  gap-4">
      <div>
        <NoteForm state={state} setState={setState} />
        <div className="mt-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full p-2 border rounded"
          />
          <TagFilter
            tags={allTags}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
          />
        </div>
      </div>
      <div className="md:col-span-2 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {visible.length === 0 ? (
          <div className="p-6 text-center col-span-full">No notes found.</div>
        ) : (
          visible.map((n) => (
            <NoteCard key={n.id} note={n} state={state} setState={setState} />
          ))
        )}
      </div>
    </div>
  );
}
