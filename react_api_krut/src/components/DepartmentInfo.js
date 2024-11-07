import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import api from '../api'; 

const DepartmentInfo = () => {
  const { fid } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputId, setInputId] = useState(fid || ''); 

  useEffect(() => {
    if (fid) fetchDepartmentInfo(fid); 
  }, [fid]);

  const fetchDepartmentInfo = async (departmentId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/departments/${departmentId}/`);
      setDepartment(response.data);
    } catch (err) {
      console.error('Failed to fetch department information:', err);
      if (err.response) {
        console.error('Error response:', err.response.data);
        setError(`Error: ${err.response.data.detail || err.response.data}`);
      } else {
        setError('Failed to fetch department information.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleFetch = (e) => {
    e.preventDefault(); 
    if (!inputId || isNaN(inputId)) {
      setError('Please enter a valid department ID.'); 
      return;
    }
    fetchDepartmentInfo(inputId); 
  };

  if (loading) return <p>Loading department information...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!department) return <p>No department found.</p>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
      <h2>Department Information</h2>
      <form onSubmit={handleFetch}>
        <input
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)} 
          placeholder="Enter Department ID"
          required 
          style={{ marginRight: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }}
        />
        <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px' }}>
          Fetch Department Info
        </button>
      </form>
      <h3 style={{ marginTop: '20px' }}>Name: {department.dname}</h3>
      <p>ID: {department.id}</p>
      <h4>Employees:</h4>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {department.employees && department.employees.length > 0 ? (
          department.employees.map((employee) => (
            <li key={employee.id} style={{ margin: '5px 0' }}>
              {employee.first_name} - Salary: ${employee.salary} - Designation: {employee.designation}
            </li>
          ))
        ) : (
          <p>No employees found in this department.</p>
        )}
      </ul>
    </div>
  );
};

export default DepartmentInfo;
