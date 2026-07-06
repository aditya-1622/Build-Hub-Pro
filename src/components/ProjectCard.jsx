import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

const STATUS_LABELS = {
  "in-progress": "🚧 In Progress",
  completed: "✅ Completed",
  archived: "📦 Archived",
};

function ProjectCard({
  project,
  onLike,
  onDelete,
  onTagClick,
  activeTechs = [],
  onToggleFavorite,
  onShare,
}) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="project-card">
      <div className="card-top-row">
        <span className={`status-badge status-${project.status || "in-progress"}`}>
          {STATUS_LABELS[project.status] || STATUS_LABELS["in-progress"]}
        </span>
        <div className="card-top-right">
          {project.category && <span className="category-tag">{project.category}</span>}
          {onToggleFavorite && (
            <button
              type="button"
              className={`favorite-btn ${project.favorite ? "favorite-active" : ""}`}
              onClick={() => onToggleFavorite(project.id)}
              aria-label={project.favorite ? "Remove from favorites" : "Add to favorites"}
              title={project.favorite ? "Remove from favorites" : "Add to favorites"}
            >
              {project.favorite ? "★" : "☆"}
            </button>
          )}
        </div>
      </div>
      <h2>
        <Link to={`/project/${project.id}`}> {project.title} </Link>
      </h2>
      <p>{project.description}</p>
      <div className="tech-list">
        {project.tech.map((techItem) => (
          <span
            key={techItem}
            className={`tech-tag ${activeTechs.includes(techItem) ? "tech-tag-active" : ""}`}
            onClick={() => onTagClick(techItem)}
          >
            {techItem}
          </span>
        ))}
      </div>
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
      {typeof project.views === "number" && (
        <span className="view-count">👁️ {project.views} views</span>
      )}
      <div className="card-actions">
        <button onClick={() => onLike(project.id)} className="like-button">
          Like ({project.likes})
        </button>
        <button onClick={() => navigate(`/edit/${project.id}`)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => setShowConfirm(true)} className="delete-btn">
          Delete
        </button>
      </div>
      {onShare && (
        <button
          type="button"
          className="share-btn"
          onClick={() => onShare(project)}
        >
          🔗 Copy Link
        </button>
      )}
      {showConfirm && (
        <ConfirmModal
          message={`Are you sure you want to delete "${project.title}"?`}
          onConfirm={() => {
            onDelete(project.id);
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default ProjectCard;
