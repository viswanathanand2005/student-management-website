import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    branch: "",
    semester: "",
    phoneNumber: "",
  });

  const { name, email, rollNumber, branch, semester, phoneNumber } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/students", formData);
      toast.success("Student added successfully");
      navigate("/students");
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("Failed to add student");
    }
  };

  return (
    <div className="add-student">
      <h2>Add New Student</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Roll Number</label>
          <input
            type="text"
            name="rollNumber"
            value={rollNumber}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Branch</label>
          <input
            type="text"
            name="branch"
            value={branch}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Semester</label>
          <input
            type="number"
            name="semester"
            value={semester}
            onChange={onChange}
            required
            min="1"
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
