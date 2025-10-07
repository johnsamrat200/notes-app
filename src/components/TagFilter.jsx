import React from "react";

export default function TagFilter({ tags, activeTag, setActiveTag }) {
  return (
    <div className="mt-3">
      <h4 className="text-sm font-medium mb-2">Tags</h4>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-2 py-1 rounded ${!activeTag ? "bg-purple-200" : ""}`}
        >
          All
        </button>
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTag(t)}
            className={`px-2 py-1 rounded ${
              activeTag === t ? "bg-purple-200" : ""
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
