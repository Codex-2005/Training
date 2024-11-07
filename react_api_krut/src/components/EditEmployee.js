// src/components/EditEmployee.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const EditEmployee = () => {
  const { id } = useParams(); 
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/employees/${id}/`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Failed to fetch employee:', error);
        setError('Failed to fetch employee.');
      } finally {
        setLoading(false);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await api.get('/departments/');
        setDepartments(response.data);
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      }
    };

    fetchEmployee();
    fetchDepartments();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/employees/${id}/`, employee);
      navigate('/employees');
    } catch (error) {
      console.error('Failed to update employee:', error);
      setError('Failed to update employee.');
    }
  };

  if (loading) return <p className="loading-message">Loading employee...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={employee.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Designation:</label>
          <input
            type="text"
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={employee.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <select
            name="department"
            value={employee.department ? employee.department.id : ''}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>
                {dept.dname}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
