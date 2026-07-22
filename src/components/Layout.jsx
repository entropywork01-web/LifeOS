import NotificationBell from "./NotificationBell";
import Sidebar from "./Sidebar";
import GlobalSearch from "./GlobalSearch";
import ThemeToggle from "./ThemeToggle";
function Layout({ children }) {
  return (
    <div className="dashboard-page">
      <Sidebar />

<main className="dashboard-content">
  <div className="top-bar">
    <GlobalSearch />
    <NotificationBell />
    <ThemeToggle />
  </div>

  {children}
</main>
    </div>
  );
}

export default Layout;