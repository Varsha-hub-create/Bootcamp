import React from "react";

const StudentCard = () => {
  return (
    <div
      style={{
        border: "2px solid #3498db",
        borderRadius: "12px",
        padding: "80px",
        maxWidth: "500px",
        textAlign: "center",
        margin: "20px ",
        marginLeft:"680px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
        alignItems:"center"
      }}
    >
      <h2 style={{ color: "#2c3e50", marginBottom: "10px" }}>Varshini</h2>
      <p style={{ color: "#2980b9", fontSize: "18px" }}>Major: IT</p>
      <p style={{ color: "#27ae60", fontSize: "16px" }}>Year: 2026</p>
    </div>
  );
};

export default StudentCard;
