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
  Alert,
  TextField,
} from "@mui/material";

const StudentCard = ({ student }) => (
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

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isMounted = true;

    axios
      .get("http://localhost:3000/students")
      .then((response) => {
        if (isMounted) {
          console.log("API Response:", response.data);
          if (Array.isArray(response.data)) {
            setStudents(response.data);
          } else {
            setError("Invalid response format from server");
          }
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          if (error.response) {
            setError(`Server error: ${error.response.status} - ${error.response.statusText}`);
          } else if (error.request) {
            setError("No response from server. Is it running?");
          } else {
            setError("Request error: " + error.message);
          }
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Student Information
      </Typography>
      <TextField
        label="Search by Name or ID"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
      ) : error ? (
        <Alert severity="error" sx={{ my: 2, textAlign: "center" }}>
          {error}
        </Alert>
      ) : filteredStudents.length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {filteredStudents.map((student) => (
            <Grid item key={student._id} xs={12} sm={6} md={4} lg={3}>
              <StudentCard student={student} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" align="center" sx={{ width: "100%" }}>
          No students found.
        </Typography>
      )}
    </Container>
  );
};

export default StudentList;
