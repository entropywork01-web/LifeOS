import { NavLink } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: "🏠", title: "Dashboard", path: "/dashboard" },
    { icon: "✅", title: "Tasks", path: "/tasks" },
    { icon: "📝", title: "Notes", path: "/notes" },
    { icon: "📅", title: "Calendar", path: "/calendar" },
    { icon: "🎯", title: "Goals", path: "/goals" },
    { icon: "💰", title: "Expenses", path: "/expenses" },
    { icon: "📊", title: "Analytics", path: "/analytics" },
    { icon: "🤖", title: "AI Assistant", path: "/assistant" },
  ];

  return (
    <aside className={collapsed ? "sidebar collapsed" : "sidebar"}>
      <button
        className="collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "➡" : "⬅"}
      </button>

      <div className="sidebar-logo">
        {!collapsed && (
          <>
            <h1>LifeOS</h1>
            <p>Your Personal OS</p>
          </>
        )}
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="sidebar-icon">{item.icon}</span>

            {!collapsed && (
              <span className="sidebar-text">{item.title}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && (
          <>
            <div className="streak-card">
              <h3>🔥 Daily Streak</h3>
              <p>12 Days</p>
            </div>

            <p className="version">
              LifeOS v0.5
            </p>
          </>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;