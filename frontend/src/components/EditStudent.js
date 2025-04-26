import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    branch: "",
    semester: "",
    phoneNumber: "",
  });

  const { name, email, rollNumber, branch, semester, phoneNumber } = formData;

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/students/${id}`
        );
        setFormData({
          name: response.data.name,
          email: response.data.email,
          rollNumber: response.data.rollNumber,
          branch: response.data.branch,
          semester: response.data.semester,
          phoneNumber: response.data.phoneNumber,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student:", error);
        toast.error("Failed to fetch student details");
        navigate("/students");
      }
    };

    fetchStudent();
  }, [id, navigate]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/students/${id}`, formData);
      toast.success("Student updated successfully");
      navigate("/students");
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Failed to update student");
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="edit-student">
      <h2>Edit Student</h2>
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
        <button type="submit" className="btn btn-primary">
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
