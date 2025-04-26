import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Student Management System</h1>
      <p>This is a MERN stack application for managing student records.</p>
      <div className="home-buttons">
        <Link to="/students" className="btn btn-primary">
          View Students
        </Link>
        <Link to="/students/add" className="btn btn-success">
          Add New Student
        </Link>
      </div>
    </div>
  );
};

export default Home;
