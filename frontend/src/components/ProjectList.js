// src/components/ProjectList.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axiosInstance.get('projects/')
      .then(response => setProjects(response.data))
      .catch(error => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            {project.name} - Status: {project.status} - Team Lead: {project.team_lead.name}
            <ul>
              {project.team.map(member => (
                <li key={member.id}>{member.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
