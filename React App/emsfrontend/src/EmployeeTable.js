import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    salary: '',
    designation: '',
    department: '',
    address: '',
    projects: [],
  });

  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch employees, departments, and projects
  useEffect(() => {
    fetchEmployees();
    axios.get('http://127.0.0.1:8000/department/')
      .then((response) => setDepartments(response.data))
      .catch(error => console.error('Error fetching departments', error));

    axios.get('http://127.0.0.1:8000/project/')
      .then((response) => setProjects(response.data))
      .catch(error => console.error('Error fetching projects', error));
  }, []);

  const fetchEmployees = () => {
    axios.get('http://127.0.0.1:8000/employee/')
      .then(response => setEmployees(response.data))
      .catch(error => console.error("Error fetching Employees data!", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/employee/create/', newEmployee);
      setSuccessMessage('Employee added successfully!');
      setErrorMessage('');
      fetchEmployees();  // Refresh employee list
      setNewEmployee({
        name: '',
        salary: '',
        designation: '',
        department: '',
        address: '',
        projects: [],
      });
    } catch (error) {
      setErrorMessage('There was an error adding the employee.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h1>Employees</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Address</th>
            <th>Projects</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.salary}</td>
              <td>{employee.designation}</td>
              <td>{employee.department}</td>
              <td>{employee.address}</td>
              <td>{employee.projects.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Employee</h2>
        <div className="form-container">
        <form onSubmit={handleSubmit}>
            <table className="form-table">
            <tbody>
                <tr>
                <th><label>Name:</label></th>
                <td>
                    <input
                    type="text"
                    name="name"
                    value={newEmployee.name}
                    onChange={handleChange}
                    required
                    />
                </td>
                </tr>
                <tr>
                <th><label>Salary:</label></th>
                <td>
                    <input
                    type="number"
                    name="salary"
                    value={newEmployee.salary}
                    onChange={handleChange}
                    required
                    />
                </td>
                </tr>
                <tr>
                <th><label>Designation:</label></th>
                <td>
                    <input
                    type="text"
                    name="designation"
                    value={newEmployee.designation}
                    onChange={handleChange}
                    required
                    />
                </td>
                </tr>
                <tr>
                <th><label>Address:</label></th>
                <td>
                    <input
                    type="text"
                    name="address"
                    value={newEmployee.address}
                    onChange={handleChange}
                    required
                    />
                </td>
                </tr>
                <tr>
                <th><label>Department:</label></th>
                <td>
                    <select
                    name="department"
                    value={newEmployee.department}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                    </select>
                </td>
                </tr>
                <tr>
                <th><label>Projects:</label></th>
                <td>
                    <select
                    name="projects"
                    value={newEmployee.projects}
                    onChange={(e) =>
                        setNewEmployee({
                        ...newEmployee,
                        projects: [...e.target.selectedOptions].map(option => option.value),
                        })
                    }
                    multiple
                    >
                    {projects.map(project => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                    </select>
                </td>
                </tr>
                <tr className="form-buttons">
                <td colSpan="2" style={{ textAlign: 'right' }}>
                    <button type="submit">Add Employee</button>
                </td>
                </tr>
            </tbody>
            </table>
        </form>
        </div>


      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default EmployeeTable;
