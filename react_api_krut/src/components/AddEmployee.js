// src/components/AddEmployee.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AddEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [salary, setSalary] = useState('');
  const [designation, setDesignation] = useState('NA');
  const [departmentId, setDepartmentId] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/employees/', {
        first_name: firstName,
        salary,
        designation,
        department: departmentId,
        address,
      });
      navigate('/employees');
    } catch (err) {
      setError('Failed to add employee.');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Add Employee</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Salary:</label>
          <input 
            type="number" 
            value={salary} 
            onChange={(e) => setSalary(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Designation:</label>
          <input 
            type="text" 
            value={designation} 
            onChange={(e) => setDesignation(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Department ID:</label>
          <input 
            type="number" 
            value={departmentId} 
            onChange={(e) => setDepartmentId(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input 
            type="text" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
          />
        </div>
        <button type="submit" className="submit-button">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
