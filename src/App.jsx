import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Notes from "./pages/Notes";
import Goals from "./pages/Goals";
import Assistant from "./pages/Assistant";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/assistant" element={<Assistant />} />
    </Routes>
  );
}

export default App;