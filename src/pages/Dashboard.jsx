import "../styles/Dashboard.css";
import { NavLink } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <h2>LifeOS</h2>

        <ul>
  <li><NavLink to="/dashboard">🏠 Dashboard</NavLink></li>
  <li><NavLink to="/tasks">✅ Tasks</NavLink></li>
  <li><NavLink to="/calendar">📅 Calendar</NavLink></li>
  <li><NavLink to="/notes">📝 Notes</NavLink></li>
  <li><NavLink to="/expenses">💰 Expenses</NavLink></li>
  <li><NavLink to="/goals">🎯 Goals</NavLink></li>
  <li><NavLink to="/ai">🤖 AI Assistant</NavLink></li>
</ul>
      </aside>

      <main className="dashboard-content">
        <h1>Welcome back 👋</h1>

        <div className="dashboard-cards">
          <div className="dashboard-box">Today's Tasks</div>
          <div className="dashboard-box">Calendar</div>
          <div className="dashboard-box">Notes</div>
          <div className="dashboard-box">AI Assistant</div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;