
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AddProject = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('NEW');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [teamLeadId, setTeamLeadId] = useState('');
  const [teamMemberIds, setTeamMemberIds] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teamMembersArray = teamMemberIds.split(',').map(id => id.trim());
    try {
      await api.post('/projects/', {
        name,
        status,
        start_date: startDate,
        end_date: endDate,
        team_lead: teamLeadId,
        team: teamMembersArray,
      });
      navigate('/projects');
    } catch (err) {
      setError('Failed to add project.');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Add Project</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="NEW">New</option>
            <option value="ON-GOING">On-going</option>
            <option value="ENDED">Ended</option>
          </select>
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Team Lead ID:</label>
          <input 
            type="number" 
            value={teamLeadId} 
            onChange={(e) => setTeamLeadId(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Team Member IDs (comma separated):</label>
          <input 
            type="text" 
            value={teamMemberIds} 
            onChange={(e) => setTeamMemberIds(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="submit-button">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;
