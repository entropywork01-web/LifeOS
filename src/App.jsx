import "./App.css";

function App() {
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

        <button className="btn">
          Get Started
        </button>
      </nav>

      <main className="hero">
        <h1>Your Entire Life.</h1>
        <h1>One Intelligent Operating System.</h1>

        <p>
          LifeOS combines your calendar, tasks, notes, habits,
          finances and AI into one beautiful workspace.
        </p>

        <button className="hero-btn">
          Start Free
        </button>
      </main>
    </div>
  );
}

export default App;