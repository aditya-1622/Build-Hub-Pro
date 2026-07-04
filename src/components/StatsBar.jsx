function StatsBar({ totalProjects, totalLikes }) {
  return (
    <div className="stats-bar">
      <div className="stat-item">
        <span className="stat-number">{totalProjects}</span>
        <span className="stat-label">Projects</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-number">{totalLikes}</span>
        <span className="stat-label">Total Likes</span>
      </div>
    </div>
  );
}

export default StatsBar;
