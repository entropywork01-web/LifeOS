import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import DashboardPreview from "./components/DashboardPreview";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">LifeOS</div>

        <ul className="nav-links">
          <li>Features</li>
          <li>AI</li>
          <li>Modules</li>
          <li>Pricing</li>
          <li>Contact</li>
        </ul>

        <button
  className="btn"
  onClick={() => navigate("/login")}
>
  Get Started
</button>
      </nav>

      <main className="hero">
        <div className="hero-tag">
          ✨ Your Personal AI Life Assistant
        </div>

        <h1>Your Entire Life.</h1>
        <h1>One Intelligent Operating System.</h1>

        <p>
          LifeOS combines your calendar, tasks, notes, habits,
          finances and AI into one beautiful workspace.
        </p>

        <button
  className="hero-btn"
  onClick={() => navigate("/signup")}
>
  Start Free
</button>

        <DashboardPreview />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
  );
}

export default App;