import { useState } from "react";

function AddProjectForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("Web");
  const [status, setStatus] = useState("in-progress");
  const [errors, setErrors] = useState({});

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
      newErrors.link = "GitHub link is required";
    } else if (!/^https?:\/\/.+/.test(link.trim())) {
      newErrors.link = "Enter a valid URL (starting with http:// or https://)";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const newProject = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      tech: tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      link: link.trim(),
      likes: 0,
      category,
      status,
    };

    onAdd(newProject);
    setTitle("");
    setDescription("");
    setTech("");
    setLink("");
    setCategory("Web");
    setStatus("in-progress");
  }

  return (
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

      <button type="submit">Add Project</button>
    </form>
  );
}

export default AddProjectForm;