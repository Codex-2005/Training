// src/components/AddDepartment.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AddDepartment = () => {
  const [dname, setDname] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/departments/', { dname });
      navigate('/departments');
    } catch (err) {
      setError('Failed to add department.');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Add Department</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Department Name:</label>
          <input 
            type="text" 
            value={dname} 
            onChange={(e) => setDname(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="submit-button">Add Department</button>
      </form>
    </div>
  );
};

export default AddDepartment;
