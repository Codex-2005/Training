// src/components/ProjectStatus.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const ProjectStatus = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');

  
  useEffect(() => {
    const fetchProjects = async () => {
      if (!status) return;

      setLoading(true);
      try {
        const response = await api.get(`/projects/${status}/`);
        console.log("Fetched projects:", response.data);
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setError('Failed to fetch projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [status]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setProjects([]); 
    setError(null);
  };
  useEffect(() => {
    console.log("Projects state updated:", projects);
  }, [projects]); 
  

  return (
    <div>
      <h2>Project Status</h2>
      <div>
        <button onClick={() => handleStatusChange('new')}>New Projects</button>
        <button onClick={() => handleStatusChange('on-going')}>Ongoing Projects</button>
        <button onClick={() => handleStatusChange('ended')}>Ended Projects</button>
      </div>
      {loading && <p>Loading projects...</p>}
      {error && <p>{error}</p>}
      {projects.length > 0 ? (
        <div>
          <h3>Project Names:</h3>
          {projects.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      ) : (
        !loading && !error && <p>No projects to display. Please select a status.</p>
      )}
    </div>
  );
  
};

export default ProjectStatus;
