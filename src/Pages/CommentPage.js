import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CommentsPage() {
  const { taskId } = useParams(); // taskId from URL
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8090/get/allbytask/${taskId}`)
      .then((res) => res.json())
      .then((data) => {setComments(data);
        console.log(data);
  })
      .catch((err) => console.error(err));
  }, [taskId]);

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
};

export default CommentsPage;