import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TasksPage() {
const navigate = useNavigate();
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8090/get/taskbyproject/${id}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, [id]);

  // Function to color status badges
  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case "TODO":
        return "#f39c12"; // orange
      case "IN_PROGRESS":
        return "#3498db"; // blue
      case "DONE":
        return "#2ecc71"; // green
      default:
        return "#7f8c8d"; // gray
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tasks for Project {id}</h1>

      {tasks.length === 0 ? (
        <p style={styles.noTasks}>No tasks found</p>
      ) : (
        <div style={styles.grid}>
          {tasks.map((task) => (
            <div key={task.id} style={styles.card}>
              <div style={styles.header}>
                <h2 style={styles.taskTitle}>{task.title}</h2>
                <span
                  style={{
                    ...styles.statusBadge,
                    backgroundColor: getStatusColor(task.status),
                  }}
                >
                  {task.status}
                </span>
              </div>

              <p style={styles.description}>{task.description}</p>

              <div style={styles.footer}>
                <button style={styles.viewBtn} onClick={()=> navigate(`/get/commentbytask/${task.id}`)}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#f5f7fb",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#2c3e50",
  },
  noTasks: {
    textAlign: "center",
    color: "#7f8c8d",
    fontSize: "18px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  taskTitle: {
    margin: 0,
    fontSize: "20px",
    color: "#34495e",
  },
  statusBadge: {
    padding: "5px 10px",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    fontSize: "12px",
    textTransform: "uppercase",
  },
  description: {
    color: "#7f8c8d",
    marginBottom: "15px",
  },
  footer: {
    textAlign: "right",
  },
  viewBtn: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#3498db",
    color: "white",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};

// Optional: hover effect for cards
document.addEventListener("mouseover", (e) => {
  if (e.target.closest("div[style*='border-radius']")) {
    e.target.closest("div[style*='border-radius']").style.transform =
      "translateY(-5px)";
    e.target.closest("div[style*='border-radius']").style.boxShadow =
      "0 12px 24px rgba(0,0,0,0.15)";
  }
});
document.addEventListener("mouseout", (e) => {
  if (e.target.closest("div[style*='border-radius']")) {
    e.target.closest("div[style*='border-radius']").style.transform = "none";
    e.target.closest("div[style*='border-radius']").style.boxShadow =
      "0 6px 12px rgba(0,0,0,0.1)";
  }
});

export default TasksPage;