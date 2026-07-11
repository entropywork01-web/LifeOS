import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>LifeOS</h2>

      <ul>
        <li>
          <NavLink to="/dashboard">🏠 Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/tasks">✅ Tasks</NavLink>
        </li>

        <li>
          <NavLink to="/calendar">📅 Calendar</NavLink>
        </li>

        <li>
          <NavLink to="/notes">📝 Notes</NavLink>
        </li>

        <li>
          <NavLink to="/expenses">💰 Expenses</NavLink>
        </li>

        <li>
          <NavLink to="/goals">🎯 Goals</NavLink>
        </li>

        <li>
          <NavLink to="/assistant">🤖 AI Assistant</NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;