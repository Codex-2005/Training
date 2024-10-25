import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newProject, setNewProject] = useState({
    name: '',
    teamLead: '',
    status: 'NEW',
    startDate: '',
    endDate: '',
    team: [],
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch projects and employees
  useEffect(() => {
    fetchProjects();
    fetchEmployees();
  }, []);

  const fetchProjects = () => {
    axios.get('http://127.0.0.1:8000/project/')
      .then(response => setProjects(response.data))
      .catch(error => console.error("Error fetching Projects data!", error));
  };

  const fetchEmployees = () => {
    axios.get('http://127.0.0.1:8000/employee/')
      .then(response => setEmployees(response.data))
      .catch(error => console.error("Error fetching Employees data!", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/project/create/', newProject);
      setSuccessMessage('Project added successfully!');
      setErrorMessage('');
      fetchProjects();  // Refresh project list
      setNewProject({
        name: '',
        teamLead: '',
        status: 'NEW',
        startDate: '',
        endDate: '',
        team: [],
      }); // Reset form
    } catch (error) {
      setErrorMessage('There was an error adding the project.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h1>Projects</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Team Lead</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>{project.team_lead}</td>
              <td>{project.status}</td>
              <td>{project.start_date}</td>
              <td>{project.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <table className="form-table">
          <tbody>
            <tr>
              <th><label htmlFor="projectName">Project Name:</label></th>
              <td>
                <input
                  type="text"
                  id="projectName"
                  name="name"
                  value={newProject.name}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th><label htmlFor="teamLead">Team Lead:</label></th>
              <td>
                <select
                  id="teamLead"
                  name="teamLead"
                  value={newProject.teamLead}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Team Lead</option>
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th><label htmlFor="team">Team Members:</label></th>
              <td>
                <select
                  id="team"
                  name="team"
                  value={newProject.team}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      team: [...e.target.selectedOptions].map(option => option.value),
                    })
                  }
                  multiple
                >
                  <option value="">Select Team Members</option>
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th><label htmlFor="status">Status:</label></th>
              <td>
                <select
                  id="status"
                  name="status"
                  value={newProject.status}
                  onChange={handleChange}
                >
                  <option value="NEW">New</option>
                  <option value="ON-GOING">On-going</option>
                  <option value="ENDED">Ended</option>
                </select>
              </td>
            </tr>
            <tr>
              <th><label htmlFor="startDate">Start Date:</label></th>
              <td>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={newProject.startDate}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th><label htmlFor="endDate">End Date:</label></th>
              <td>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={newProject.endDate}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: 'right' }}>
                <button type="submit">Add Project</button>
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

export default ProjectTable;
