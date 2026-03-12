import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CommentsPage() {
  const { taskId } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:8090/get/allbytask/${taskId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [taskId]);

  if (loading) {
    return (
      <div style={styles.center}>
        <div style={styles.spinner}></div>
        <h2>Loading Comments...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Comments for Task {taskId}</h1>

      {comments.length === 0 ? (
        <p style={styles.noComments}>No comments yet</p>
      ) : (
        <div style={styles.grid}>
          {comments.map((comment) => (
            <div key={comment.id} style={styles.card}>
              <div style={styles.header}>
                <span style={styles.user}>{comment.user}</span>
                <span style={styles.date}>
                  {new Date(comment.creationDate).toLocaleString()}
                </span>
              </div>
              <p style={styles.commentText}>{comment.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#f5f7fb",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#2c3e50",
  },
  noComments: {
    textAlign: "center",
    color: "#7f8c8d",
    fontSize: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "15px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  user: {
    fontWeight: "bold",
    color: "#34495e",
  },
  date: {
    fontSize: "12px",
    color: "#7f8c8d",
  },
  commentText: {
    color: "#2c3e50",
    fontSize: "14px",
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

export default CommentsPage;