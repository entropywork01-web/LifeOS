function StatsCard({ icon, title, value }) {
  return (
    <div className="dashboard-box">
      <div
        style={{
          fontSize: "36px",
          marginBottom: "15px",
        }}
      >
        {icon}
      </div>

      <h3>{title}</h3>

      <h2
        style={{
          marginTop: "10px",
          color: "#60A5FA",
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default StatsCard;