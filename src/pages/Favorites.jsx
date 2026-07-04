import ProjectCard from "../components/ProjectCard";

function Favorites({
  projects,
  onLike,
  onDelete,
  onToggleFavorite,
  onShare,
  activeTechs,
  onTagClick,
}) {
  const favoriteProjects = projects.filter((p) => p.favorite);

  return (
    <div className="app-container">
      <h1>⭐ Favorite Projects</h1>

      {favoriteProjects.length === 0 ? (
        <p className="empty-state">
          No favorites yet — tap the ☆ on a project card to save it here!
        </p>
      ) : (
        <div className="projects-grid">
          {favoriteProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onLike={onLike}
              onDelete={onDelete}
              onTagClick={onTagClick}
              activeTechs={activeTechs}
              onToggleFavorite={onToggleFavorite}
              onShare={onShare}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
