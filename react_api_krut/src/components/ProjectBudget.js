// src/components/ProjectBudget.js
import React, { useState } from 'react';
import api from '../api'; 

const ProjectBudget = () => {
  const [projectId, setProjectId] = useState('');
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBudget = async () => {
    if (!projectId) return; 
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/projects/${projectId}/budget/`);
      setBudget(response.data.total_budget);
    } catch (err) {
      console.error('Failed to fetch budget:', err);
      setError('Failed to fetch budget. Please check the Project ID.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    fetchBudget(); 
  };

  return (
    <div>
      <h3>Project Budget</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          placeholder="Enter Project ID"
          required
        />
        <button type="submit">Get Budget</button>
      </form>

      {loading && <p>Loading budget...</p>}
      {error && <p>{error}</p>}
      {budget !== null && (
        <p>
          Total Budget for Project ID {projectId}: ${budget.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default ProjectBudget;
