import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import { Spinner, Alert, Card, Container, Row, Col } from "react-bootstrap";
import "./App.css";

const API_URL = "http://localhost:5000/students"; // Ensure this matches your backend

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/students"); // ✅ Use full URL
        if (!response.ok) throw new Error("Failed to fetch students");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchStudents();
  }, []);
  
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Student List</h2>

      {loading && <Spinner animation="border" className="d-block mx-auto" />}
      {error && (
        <Alert variant="danger">
          <strong>Error:</strong> {error} <br />
          Make sure your backend is running at <code>{API_URL}</code>
        </Alert>
      )}

      {!loading && !error && students.length === 0 && (
        <Alert variant="warning" className="text-center">
          No students found.
        </Alert>
      )}

      {!loading && !error && students.length > 0 && (
        <Row>
          {students.slice(0, 4).map((student, index) => (
            <Col xs={12} sm={6} md={6} key={student._id || student.id} className="mb-4">
              <Card className="student-card">
                <Card.Body>
                  <Card.Title className="card-title">{student.name}</Card.Title>
                  <Card.Subtitle className="card-subtitle mb-2 text-muted">
                    ID: {student.rollNo || student.id}
                  </Card.Subtitle>
                  <Card.Text className="card-text">
                    <strong>Major:</strong> {student.major}
                  </Card.Text>
                  <Card.Text className="card-text">
                    <strong>Age:</strong> {student.age}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default App;