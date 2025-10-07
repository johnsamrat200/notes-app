import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App";
import NotesPage from "./routes/NotesPage";
import TrashPage from "./components/TrashPage";
import ArchivePage from "./components/ArchivePage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<NotesPage />} />
          <Route path="archive" element={<ArchivePage />} />
          <Route path="trash" element={<TrashPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
