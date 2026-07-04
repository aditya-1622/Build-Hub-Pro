import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

function EditProject({ projects, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === Number(id));

  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [tech, setTech] = useState(project?.tech?.join(", ") || "");
  const [link, setLink] = useState(project?.link || "");
  const [category, setCategory] = useState(project?.category || "Web");
  const [status, setStatus] = useState(project?.status || "in-progress");
  const [errors, setErrors] = useState({});
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  if (!project) {
    return <p>Project not found</p>;
  }

  function validate() {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";

    const techList = tech
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (techList.length === 0) newErrors.tech = "Add at least one technology";

    if (!link.trim()) {
      newErrors.link = "Link is required";
    } else if (!/^https?:\/\/.+/.test(link.trim())) {
      newErrors.link = "Enter a valid URL (starting with http:// or https://)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function hasChanges() {
    return (
      title !== (project.title || "") ||
      description !== (project.description || "") ||
      tech !== (project.tech?.join(", ") || "") ||
      link !== (project.link || "") ||
      category !== (project.category || "Web") ||
      status !== (project.status || "in-progress")
    );
  }

  function handleCancelClick() {
    if (hasChanges()) {
      setShowCancelConfirm(true);
    } else {
      navigate("/");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    const updatedProject = {
      ...project,
      title: title.trim(),
      description: description.trim(),
      tech: tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      link: link.trim(),
      category,
      status,
    };

    onUpdate(updatedProject);
    navigate("/");
  }

  return (
    <div className="edit-page">
      <h1>Edit Project</h1>
      <form onSubmit={handleSubmit} className="add-form">
        <input
          type="text"
          placeholder="Project title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors((prev) => ({ ...prev, title: "" }));
          }}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors((prev) => ({ ...prev, description: "" }));
          }}
        />
        {errors.description && <span className="error-text">{errors.description}</span>}

        <input
          type="text"
          placeholder="Tech (comma separated, e.g. React, CSS)"
          value={tech}
          onChange={(e) => {
            setTech(e.target.value);
            setErrors((prev) => ({ ...prev, tech: "" }));
          }}
        />
        {errors.tech && <span className="error-text">{errors.tech}</span>}

        <input
          type="text"
          placeholder="GitHub link"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
            setErrors((prev) => ({ ...prev, link: "" }));
          }}
        />
        {errors.link && <span className="error-text">{errors.link}</span>}

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Web">Web</option>
          <option value="Mobile">Mobile</option>
          <option value="AI/ML">AI/ML</option>
          <option value="Hardware">Hardware</option>
          <option value="Design">Design</option>
          <option value="Other">Other</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="archived">Archived</option>
        </select>

        <div className="edit-actions">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleCancelClick} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>

      {showCancelConfirm && (
        <ConfirmModal
          message="You have unsaved changes. Discard them?"
          onConfirm={() => {
            setShowCancelConfirm(false);
            navigate("/");
          }}
          onCancel={() => setShowCancelConfirm(false)}
        />
      )}
    </div>
  );
}

export default EditProject;