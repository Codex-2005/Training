// src/components/DepartmentList.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import api from '../api';
import DepartmentSalary from './DepartmentSalary'; 

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSalaries, setShowSalaries] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get('/departments/');
        setDepartments(response.data);
      } catch (error) {
        console.error('Failed to fetch departments:', error);
        setError('Failed to fetch departments.');
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await api.delete(`/departments/${id}/`);
        setDepartments(departments.filter(dept => dept.id !== id)); 
      } catch (error) {
        console.error('Failed to delete department:', error);
        setError('Failed to delete department.');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/departments/edit/${id}`); 
  };

  const handleShowSalaries = () => {
    setShowSalaries(!showSalaries); 
  };

  if (loading) return <p className="loading-message">Loading departments...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="container">
      <h2>Departments</h2>
      <Link to="/departments/add" className="add-button">Add Department</Link>
      <button onClick={handleShowSalaries} className="toggle-salaries-button">
        {showSalaries ? 'Hide Total Salaries' : 'Show Total Salaries'}
      </button>
      {showSalaries && <DepartmentSalary />} {/* Conditionally render the DepartmentSalary component */}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Department Name</th>
            <th>Actions</th> {/* Added Actions column */}
          </tr>
        </thead>
        <tbody>
          {departments.map(dept => (
            <tr key={dept.id}>
              <td>{dept.id}</td>
              <td>{dept.dname}</td>
              <td>
                <button onClick={() => handleEdit(dept.id)}>Edit</button>
                <button onClick={() => handleDelete(dept.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentList;
