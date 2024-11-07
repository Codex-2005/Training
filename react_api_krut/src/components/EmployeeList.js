// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get('/employees/');
        setEmployees(response.data);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
        setError('Failed to fetch employees.');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await api.delete(`/employees/${id}/`);
        setEmployees(employees.filter(emp => emp.id !== id));
      } catch (error) {
        console.error('Failed to delete employee:', error);
        setError('Failed to delete employee.');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/employees/${id}`);
  };

  const handleFetchDepartment = async () => {
    if (!employeeId) {
      alert('Please enter an employee ID.');
      return;
    }
    try {
      const response = await api.get(`/employees/${employeeId}/departments/`);
      setDepartment(response.data); // Set the department data
    } catch (error) {
      console.error('Failed to fetch department:', error);
      setError('Failed to fetch department.');
      setDepartment(null); // Clear department on error
    }
  };

  if (loading) return <p className="loading-message">Loading employees...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="container">
      <h2>Employees</h2>
      <Link to="/employees/add" className="add-button">Add Employee</Link>

      {/* Input field to fetch department by employee ID */}
      <div className="fetch-department">
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Enter Employee ID"
        />
        <button onClick={handleFetchDepartment}>Get Department</button>
      </div>

      {department && (
        <div className="department-info">
          <h3>Department Information</h3>
          <p>Department Name: {department}</p> {/* Displaying department name directly */}
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.first_name}</td>
              <td>{emp.salary}</td>
              <td>{emp.department ? emp.department : 'N/A'}</td>
              <td>{emp.designation}</td>
              <td>{emp.address}</td>
              <td>
                <button onClick={() => handleEdit(emp.id)}>Edit</button>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
