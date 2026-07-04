import { useState, useEffect } from "react";

const DEFAULT_PROFILE = {
  name: "Your Name",
  bio: "Building things and tracking progress.",
  avatar: "🧑‍💻",
  github: "",
  linkedin: "",
  twitter: "",
  website: "",
};

const SOCIAL_META = [
  { key: "github", icon: "🐙", label: "GitHub" },
  { key: "linkedin", icon: "💼", label: "LinkedIn" },
  { key: "twitter", icon: "🐦", label: "Twitter / X" },
  { key: "website", icon: "🌐", label: "Website" },
];

function Profile({ projects }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("buildhub-profile");
    return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(profile);

  useEffect(() => {
    localStorage.setItem("buildhub-profile", JSON.stringify(profile));
  }, [profile]);

  function handleSave(e) {
    e.preventDefault();
    setProfile(form);
    setIsEditing(false);
  }

  function handleEditClick() {
    setForm(profile);
    setIsEditing(true);
  }

  const totalLikes = projects.reduce((sum, p) => sum + p.likes, 0);
  const activeSocials = SOCIAL_META.filter((s) => profile[s.key]);

  return (
    <div className="app-container profile-page">
      <div className="profile-card">
        <div className="profile-avatar">{profile.avatar}</div>

        {!isEditing ? (
          <>
            <h1 className="profile-name">{profile.name}</h1>
            <p className="profile-bio">{profile.bio}</p>

            {activeSocials.length > 0 && (
              <div className="social-links-row">
                {activeSocials.map((s) => (
                  <a
                    key={s.key}
                    href={profile[s.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-btn"
                    title={s.label}
                  >
                    {s.icon} {s.label}
                  </a>
                ))}
              </div>
            )}

            <button className="edit-btn" onClick={handleEditClick}>
              Edit Profile
            </button>
          </>
        ) : (
          <form className="add-form profile-edit-form" onSubmit={handleSave}>
            <input
              type="text"
              placeholder="Avatar (emoji)"
              value={form.avatar}
              onChange={(e) => setForm({ ...form, avatar: e.target.value })}
            />
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <textarea
              placeholder="Bio"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />

            <p className="social-form-label">Social links (optional)</p>
            {SOCIAL_META.map((s) => (
              <input
                key={s.key}
                type="text"
                placeholder={`${s.icon} ${s.label} URL`}
                value={form[s.key] || ""}
                onChange={(e) => setForm({ ...form, [s.key]: e.target.value })}
              />
            ))}

            <div className="edit-actions">
              <button type="submit">Save</button>
              <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{projects.length}</span>
          <span className="stat-label">Projects</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-number">{totalLikes}</span>
          <span className="stat-label">Total Likes</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-number">{projects.filter((p) => p.favorite).length}</span>
          <span className="stat-label">Favorites</span>
        </div>
      </div>

      <h2 className="profile-section-title">Your Projects</h2>

      {projects.length === 0 ? (
        <p className="empty-state">No projects yet — add your first one!</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="tech-list">
                {project.tech.map((t) => (
                  <span key={t} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>
              <span className="stat-label">{project.likes} likes</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
