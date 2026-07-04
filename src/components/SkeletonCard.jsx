function SkeletonCard() {
  return (
    <div className="project-card skeleton-card">
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line skeleton-text" />
      <div className="skeleton-line skeleton-text short" />
      <div className="skeleton-tags">
        <span className="skeleton-tag" />
        <span className="skeleton-tag" />
      </div>
    </div>
  );
}

export default SkeletonCard;