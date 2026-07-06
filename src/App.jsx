import StatsBar from "./components/StatsBar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SkeletonCard from "./components/SkeletonCard";
import ProjectCard from "./components/ProjectCard";
import { initialProjects } from "./data/projects";
import AddProjectPage from "./pages/AddProjectPage";
import ProjectDetail from "./pages/ProjectDetail";
import EditProject from "./pages/EditProject";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Toast from "./components/Toast";
import Confetti from "./components/Confetti";

function HomePage({
  projects,
  searchTerm,
  setSearchTerm,
  handleLike,
  handleDelete,
  handleToggleFavorite,
  handleShare,
  sortBy,
  setSortBy,
  activeTechs,
  toggleActiveTech,
  clearActiveTechs,
  activeCategory,
  setActiveCategory,
  isLoading,
  onImportClick,
  onExport,
}) {
  const searchInputRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      const tag = document.activeElement?.tagName;
      const isTyping = tag === "INPUT" || tag === "TEXTAREA";

      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "Escape" && isTyping) {
        setSearchTerm("");
        searchInputRef.current?.blur();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSearchTerm]);

  const totalProjects = projects.length;
  const totalLikes = projects.reduce((sum, p) => sum + p.likes, 0);

  let filteredProjects = projects.filter((project) => {
    const term = searchTerm.toLowerCase();
    return (
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.tech.some((t) => t.toLowerCase().includes(term))
    );
  });

  if (activeTechs.length > 0) {
    filteredProjects = filteredProjects.filter((project) =>
      activeTechs.every((tech) => project.tech.includes(tech))
    );
  }

  if (activeCategory) {
    filteredProjects = filteredProjects.filter(
      (project) => project.category === activeCategory
    );
  }

  filteredProjects = [...filteredProjects];
  if (sortBy === "newest") {
    filteredProjects.reverse();
  } else if (sortBy === "likes") {
    filteredProjects.sort((a, b) => b.likes - a.likes);
  } else if (sortBy === "az") {
    filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className="app-container">
      <Hero />

      <StatsBar totalProjects={totalProjects} totalLikes={totalLikes} />

      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search by title, description, or tech... (press / to focus)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="toolbar">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="newest">Newest First</option>
          <option value="likes">Most Liked</option>
          <option value="az">A - Z</option>
        </select>

        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="sort-select"
        >
          <option value="">All Categories</option>
          <option value="Web">Web</option>
          <option value="Mobile">Mobile</option>
          <option value="AI/ML">AI/ML</option>
          <option value="Hardware">Hardware</option>
          <option value="Design">Design</option>
          <option value="Other">Other</option>
        </select>

        <span className="project-count">{filteredProjects.length} Projects</span>

        <button type="button" className="export-btn" onClick={onExport}>
          ⬇ Export
        </button>
        <button type="button" className="import-btn" onClick={onImportClick}>
          ⬆ Import
        </button>

        <Link to="/add" className="add-project-btn">
          + Add Project
        </Link>
      </div>

      {activeTechs.length > 0 && (
        <div className="active-filters-row">
          {activeTechs.map((tech) => (
            <span
              key={tech}
              className="active-filter-chip"
              onClick={() => toggleActiveTech(tech)}
            >
              {tech} ✕
            </span>
          ))}
          <span className="clear-filters-link" onClick={clearActiveTechs}>
            Clear all
          </span>
        </div>
      )}

      {isLoading ? (
        <div className="projects-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <p className="empty-state">No projects found — add your first one!</p>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onLike={handleLike}
              onDelete={handleDelete}
              onTagClick={toggleActiveTech}
              activeTechs={activeTechs}
              onToggleFavorite={handleToggleFavorite}
              onShare={handleShare}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("buildhub-projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTechs, setActiveTechs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null);
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  function showToast(message, type = "success") {
    setToastMessage(message);
    setToastType(type);
  }

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("buildhub-theme");
    return saved ? saved : "light";
  });

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    localStorage.setItem("buildhub-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleActiveTech(tech) {
    setActiveTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  }

  function clearActiveTechs() {
    setActiveTechs([]);
  }

  function handleLike(id) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, likes: project.likes + 1 } : project
      )
    );
  }

  function handleToggleFavorite(id) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id
          ? { ...project, favorite: !project.favorite }
          : project
      )
    );
  }

  function handleShare(project) {
    const url = `${window.location.origin}${window.location.pathname}#/project/${project.id}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => showToast("Link copied to clipboard!", "success"))
        .catch(() => showToast("Could not copy link", "error"));
    } else {
      showToast("Copy not supported in this browser", "error");
    }
  }

  function handleAddProject(newProject) {
    setProjects((prevProjects) => [...prevProjects, { ...newProject, views: 0 }]);
    showToast("Project added!", "success");
    setConfettiTrigger((prev) => prev + 1);
  }

  function handleViewProject(id) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id
          ? { ...project, views: (project.views || 0) + 1 }
          : project
      )
    );
  }

  function handleUpdateProject(updatedProject) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
    showToast("Project updated!", "success");
  }

  function handleDelete(id) {
    setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
    showToast("Project deleted!", "success");
  }

  useEffect(() => {
    localStorage.setItem("buildhub-projects", JSON.stringify(projects));
  }, [projects]);

  function handleExport() {
    const dataStr = JSON.stringify(projects, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `buildhub-projects-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Projects exported!", "success");
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleImportFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (!Array.isArray(imported)) {
          throw new Error("Invalid format");
        }
        setProjects((prevProjects) => {
          const existingIds = new Set(prevProjects.map((p) => p.id));
          const merged = [...prevProjects];
          imported.forEach((p) => {
            if (!p || typeof p.title !== "string") return;
            if (existingIds.has(p.id)) {
              p = { ...p, id: Date.now() + Math.random() };
            }
            merged.push(p);
          });
          return merged;
        });
        showToast(`Imported ${imported.length} project(s)!`, "success");
      } catch {
        showToast("Invalid JSON file", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <input
        type="file"
        accept="application/json"
        ref={fileInputRef}
        onChange={handleImportFile}
        style={{ display: "none" }}
      />
      <Confetti trigger={confettiTrigger} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              projects={projects}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleLike={handleLike}
              handleDelete={handleDelete}
              handleToggleFavorite={handleToggleFavorite}
              handleShare={handleShare}
              sortBy={sortBy}
              setSortBy={setSortBy}
              activeTechs={activeTechs}
              toggleActiveTech={toggleActiveTech}
              clearActiveTechs={clearActiveTechs}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              isLoading={isLoading}
              onImportClick={handleImportClick}
              onExport={handleExport}
            />
          }
        />
        <Route path="/add" element={<AddProjectPage onAdd={handleAddProject} />} />
        <Route
          path="/project/:id"
          element={
            <ProjectDetail projects={projects} onShare={handleShare} onView={handleViewProject} />
          }
        />
        <Route
          path="/edit/:id"
          element={<EditProject projects={projects} onUpdate={handleUpdateProject} />}
        />
        <Route path="/profile" element={<Profile projects={projects} />} />
        <Route
          path="/favorites"
          element={
            <Favorites
              projects={projects}
              onLike={handleLike}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
              onShare={handleShare}
              activeTechs={activeTechs}
              onTagClick={toggleActiveTech}
            />
          }
        />
      </Routes>
      <Footer />
      <Toast
        message={toastMessage}
        type={toastType}
        onClear={() => setToastMessage("")}
      />
    </>
  );
}

export default App;
