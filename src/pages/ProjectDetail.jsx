import { useParams, Link } from "react-router-dom";

const STATUS_LABELS = {
  "in-progress": "🚧 In Progress",
  completed: "✅ Completed",
  archived: "📦 Archived",
};

function ProjectDetail({ projects, onShare }) {
  const { id } = useParams();
  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="project-detail">
        <h2>Project not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <Link to="/">← Back to Home</Link>
      <div className="card-top-row">
        <span className={`status-badge status-${project.status || "in-progress"}`}>
          {STATUS_LABELS[project.status] || STATUS_LABELS["in-progress"]}
        </span>
        {project.category && <span className="category-tag">{project.category}</span>}
      </div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <div className="tech-list">
        {project.tech.map((techItem) => (
          <span key={techItem} className="tech-tag">
            {techItem}
          </span>
        ))}
      </div>
      <p>Likes: {project.likes}</p>
      <div className="detail-actions">
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
        {onShare && (
          <button
            type="button"
            className="share-btn"
            onClick={() => onShare(project)}
          >
            🔗 Copy Link
          </button>
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;
