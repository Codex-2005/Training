import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get('/employees/');
        setEmployees(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch employees');
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>{error}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Salary</th>
          <th>Department</th>
          <th>Designation</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>{emp.first_name}</td>
            <td>{emp.salary}</td>
            <td>{emp.department}</td>
            <td>{emp.designation}</td>
            <td>{emp.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const DepartmentTable = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get('/departments/');
        setDepartments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch departments');
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  if (loading) return <p>Loading departments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Department Name</th>
        </tr>
      </thead>
      <tbody>
        {departments.map(dep => (
          <tr key={dep.id}>
            <td>{dep.id}</td>
            <td>{dep.dname}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects/');
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch projects');
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>{error}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Project Name</th>
          <th>Status</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Project Lead</th>
          <th>Project Team</th>
        </tr>
      </thead>
      <tbody>
        {projects.map(proj => (
          <tr key={proj.id}>
          <td>{proj.id}</td>
          <td>{proj.name}</td>
          <td>{proj.status}</td>
          <td>{proj.start_date}</td>
          <td>{proj.end_date}</td>
          <td>{proj.team_lead ? proj.team_lead : 'No team lead'}</td>
          <td>
            {proj.team.length > 0 
              ? proj.team.map(member => member.first_name).join(', ')  
              : 'No team members'}
          </td>
        </tr>
        
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <h1>Management App</h1>
        <nav>
          <Link to="/employees">Employees</Link> |{' '}
          <Link to="/departments">Departments</Link> |{' '}
          <Link to="/projects">Projects</Link>
        </nav>

        <Routes>
          <Route path="/employees" element={<EmployeeTable />} />
          <Route path="/departments" element={<DepartmentTable />} />
          <Route path="/projects" element={<ProjectTable />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
