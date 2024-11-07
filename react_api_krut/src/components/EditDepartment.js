// src/components/EditDepartment.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const EditDepartment = () => {
  const { id } = useParams(); 
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await api.get(`/departments/${id}/`);
        setDepartment(response.data);
      } catch (error) {
        console.error('Failed to fetch department:', error);
        setError('Failed to fetch department.');
      } finally {
        setLoading(false);
      }
    };
    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prevDepartment) => ({
      ...prevDepartment,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/departments/${id}/`, department);
      navigate('/departments'); // Redirect back to the department list
    } catch (error) {
      console.error('Failed to update department:', error);
      setError('Failed to update department.');
    }
  };

  if (loading) return <p className="loading-message">Loading department...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="container">
      <h2>Edit Department</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Department Name:</label>
          <input
            type="text"
            name="dname"
            value={department.dname}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Department</button>
      </form>
    </div>
  );
};

export default EditDepartment;
