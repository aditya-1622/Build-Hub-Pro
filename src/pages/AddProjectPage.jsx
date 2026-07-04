import { useNavigate } from "react-router-dom";
import AddProjectForm from "../components/AddProjectForm";

function AddProjectPage({ onAdd }) {
  const navigate = useNavigate();

  function handleAdd(project) {
    onAdd(project);
    navigate("/");
  }

  return (
    <div className="add-page">
      <h1>Add a New Project</h1>
      <AddProjectForm onAdd={handleAdd} />
    </div>
  );
}

export default AddProjectPage;
