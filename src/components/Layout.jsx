import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="dashboard-page">
      <Sidebar />

      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;