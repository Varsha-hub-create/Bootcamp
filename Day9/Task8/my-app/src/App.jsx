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
  Pagination,
} from "@mui/material";
import { styled } from "@mui/system";

// Styled Pagination
const StyledPagination = styled(Pagination)({
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",


  "& .MuiPaginationItem-root": {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#555",
    borderRadius: "8px",
    transition: "all 0.3s ease-in-out",
  },

  "& .Mui-selected": {
    backgroundColor: "#1976d2 !important",
    color: "#fff !important",
    fontWeight: "bold",
    transform: "scale(1.1)",
  },

  "& .MuiPaginationItem-root:hover": {
    backgroundColor: "#f0f0f0",
    transform: "scale(1.05)",
  },
});

const StudentCard = ({ student }) => (
  <Card className="student-card">
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
        <strong>Year:</strong> {student.age}
      </Typography>
    </CardContent>
  </Card>
);

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");

    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        if (isMounted) {
          console.log("✅ API Response:", response.data);
          if (response.data && Array.isArray(response.data.students)) {
            setStudents(response.data.students);
          } else {
            console.error("❌ Invalid response structure:", response.data);
            setError("Unexpected response format from server");
          }
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error("❌ API Error:", error);
          setError(
            error.response
              ? `Server error: ${error.response.status} - ${error.response.statusText}`
              : `Request error: ${error.message}`
          );
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

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container className="student-list-container">
      <Typography variant="h4" gutterBottom align="center" className="title">
        Student Information
      </Typography>
      <TextField
        label="Search by Name or ID"
        variant="outlined"
        fullWidth
        className="search-box"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {loading ? (
        <CircularProgress className="loading-spinner" />
      ) : error ? (
        <Alert severity="error" className="error-message">
          {error}
        </Alert>
      ) : currentStudents.length > 0 ? (
        <>
          <Grid container spacing={3} justifyContent="center">
            {currentStudents.map((student) => (
              <Grid item key={student._id} xs={12} sm={6} md={4} lg={3}>
                <StudentCard student={student} />
              </Grid>
            ))}
          </Grid>
          <StyledPagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </>
      ) : (
        <Typography variant="body1" align="center" className="no-results">
          No students found.
        </Typography>
      )}
    </Container>
  );
};

export default StudentList;