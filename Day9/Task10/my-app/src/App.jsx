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
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";

const Layout = ({ children }) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">My App</Typography>
      </Toolbar>
    </AppBar>
    <Container sx={{ mt: 4 }}>{children}</Container>
  </>
);

const StudentCard = ({ student }) => (
  <Card sx={{ minWidth: 275, borderRadius: 2, boxShadow: 3, p: 2 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {student?.name || "Unknown Name"}
      </Typography>
      <Typography variant="body2">
        <strong>ID:</strong> {student?.rollNo || "N/A"}
      </Typography>
      <Typography variant="body2">
        <strong>Major:</strong> {student?.major || "N/A"}
      </Typography>
      <Typography variant="body2">
        <strong>Year:</strong> {student?.age || "N/A"}
      </Typography>
    </CardContent>
  </Card>
);

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:3000/students", {
        timeout: 5000,
      });
      if (Array.isArray(response.data)) {
        setStudents(response.data);
      } else {
        setStudents([]);
        setError("Invalid response format from server");
      }
    } catch (error) {
      setError("Error fetching data: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    const interval = setInterval(fetchStudents, 30000); // Auto refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student?.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      String(student?.rollNo || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
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
      <Button variant="contained" color="primary" onClick={fetchStudents} sx={{ mb: 3 }}>
        Refresh Data
      </Button>
      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
      ) : error ? (
        <Alert severity="error" sx={{ my: 2, textAlign: "center" }}>
          {error}
        </Alert>
      ) : filteredStudents.length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {filteredStudents.map((student) => (
            <Grid item key={student?._id || Math.random()} xs={12} sm={6} md={4} lg={3}>
              <StudentCard student={student} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" align="center" sx={{ width: "100%" }}>
          No students found.
        </Typography>
      )}
    </Layout>
  );
};

export default StudentList;
