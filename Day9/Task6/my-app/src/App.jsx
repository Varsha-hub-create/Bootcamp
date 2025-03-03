import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Container,
  Alert
} from "@mui/material";

const StudentCard = ({ student }) => {
  return (
    <Card sx={{ minWidth: 275, borderRadius: 2, boxShadow: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {student.name}
        </Typography>
        <Typography variant="body2">
          <strong>ID:</strong> {student.rollNo}
        </Typography>
        <Typography variant="body2">
          <strong>Major:</strong> {student.major}
        </Typography>
        <Typography variant="body2">
          <strong>Year:</strong> {student.year}
        </Typography>
      </CardContent>
    </Card>
  );
};

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/students") // Connect to Postman API
      .then((response) => {
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          setError("Invalid data format from server");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Fetch Error:", error);
        setError("Failed to connect to the backend. Check Postman API.");
        setLoading(false);
      });
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Student Information
      </Typography>
      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
      ) : error ? (
        <Alert severity="error" sx={{ my: 2, textAlign: "center" }}>
          {error}
        </Alert>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {students.length > 0 ? (
            students.map((student) => (
              <Grid item key={student._id} xs={12} sm={6} md={4} lg={3}>
                <StudentCard student={student} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" align="center" sx={{ width: "100%" }}>
              No students found.
            </Typography>
          )}
        </Grid>
      )}
    </Container>
  );
};
export default StudentList;

