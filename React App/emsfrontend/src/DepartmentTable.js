import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DepartmentTable = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({ name: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch departments
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
    axios.get('http://127.0.0.1:8000/department/')
      .then(response => setDepartments(response.data))
      .catch(error => console.error("Error fetching Departments data!", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDepartment({ ...newDepartment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/department/create/', newDepartment);
      setSuccessMessage('Department added successfully!');
      setErrorMessage('');
      fetchDepartments();  // Refresh department list
      setNewDepartment({ name: '' }); // Reset form
    } catch (error) {
      setErrorMessage('There was an error adding the department.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h1>Departments</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Department</h2>
      <form onSubmit={handleSubmit}>
        <table className="form-table">
          <tbody>
            <tr>
              <th><label htmlFor="departmentName">Department Name:</label></th>
              <td>
                <input
                  type="text"
                  id="departmentName"
                  name="name"
                  value={newDepartment.name}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: 'right' }}>
                <button type="submit">Add Department</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default DepartmentTable;
