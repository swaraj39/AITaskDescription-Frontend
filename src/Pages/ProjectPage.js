import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Clock, ChevronRight, FolderOpen, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProjectsPage() {
const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:8090/get/all/project");

      setProjects(res.data);
      setError("");

    } catch (err) {
      console.error(err);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const getRandomGradient = (index) => {
    const gradients = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    ];

    return gradients[index % gradients.length];
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  if (loading) {
    return (
      <div style={styles.center}>
        <div style={styles.spinner}></div>
        <h2>Loading Projects...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.center}>
        <AlertCircle size={40} color="red" />
        <h2>{error}</h2>

        <button onClick={loadProjects} style={styles.button}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <FolderOpen size={28} />
        <h1>Projects ({projects.length})</h1>
      </div>

      {/* Grid */}
      <div style={styles.grid}>

        {projects.map((project, index) => (

          <div
            key={project.id}
            style={{
              ...styles.card,
              ...(hoveredCard === project.id && styles.cardHover)
            }}
            onMouseEnter={() => setHoveredCard(project.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >

            {/* Card Header */}
            <div
              style={{
                ...styles.cardHeader,
                background: getRandomGradient(index)
              }}
            >
              <h3>{project.name}</h3>
            </div>

            {/* Content */}
            <div style={styles.cardBody}>

              <p>{project.description || "No description available"}</p>

              <div style={styles.meta}>
                <Calendar size={14} />
                <span>{formatDate(project.startDate)}</span>
              </div>

          

              <button style={styles.button}
                onClick={() => navigate(`/get/taskbyproject/${project.id}`)}>
                View Tasks
              </button>

            </div>
          </div>

        ))}

      </div>
    </div>
  );
}

const styles = {

  container: {
    padding: "40px",
    minHeight: "100vh",
    background: "#f1f5f9"
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: "20px"
  },

  card: {
    background: "white",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
    transition: "0.3s"
  },

  cardHover: {
    transform: "translateY(-6px)"
  },

  cardHeader: {
    padding: "20px",
    color: "white",
    fontWeight: "600"
  },

  cardBody: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  meta: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#64748b",
    fontSize: "14px"
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px"
  },

  center: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px"
  },

  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #ddd",
    borderTop: "4px solid #4f46e5",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  }
};

export default ProjectsPage;