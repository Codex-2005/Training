
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import api from '../api';

// const ProjectList = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await api.get('/projects/');
//         setProjects(response.data);
//       } catch (error) {
//         console.error('Failed to fetch projects:', error);
//         setError('Failed to fetch projects.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProjects();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this project?")) {
//       try {
//         await api.delete(`/projects/${id}/`);
//         setProjects(projects.filter(proj => proj.id !== id));
//       } catch (error) {
//         console.error('Failed to delete project:', error);
//         setError('Failed to delete project.');
//       }
//     }
//   };

//   const handleEdit = (id) => {
//     navigate(`/projects/edit/${id}`);
//   };

//   if (loading) return <p className="loading-message">Loading projects...</p>;
//   if (error) return <p className="error-message">{error}</p>;

//   return (
//     <div className="container">
//       <h2>Projects</h2>
//       <Link to="/projects/add" className="add-button">Add Project</Link>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Project Name</th>
//             <th>Status</th>
//             <th>Start Date</th>
//             <th>End Date</th>
//             <th>Project Lead</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {projects.map(proj => (
//             <tr key={proj.id}>
//               <td>{proj.id}</td>
//               <td>{proj.name}</td>
//               <td>{proj.status}</td>
//               <td>{proj.start_date}</td>
//               <td>{proj.end_date}</td>
//               <td>{proj.team_lead ? proj.team_lead : 'No team lead'}</td>
//               <td>
//                 <button onClick={() => handleEdit(proj.id)}>Edit</button>
//                 <button onClick={() => handleDelete(proj.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProjectList;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects/');
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setError('Failed to fetch projects.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await api.delete(`/projects/${id}/`);
        setProjects(projects.filter(proj => proj.id !== id));
      } catch (error) {
        console.error('Failed to delete project:', error);
        setError('Failed to delete project.');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/projects/edit/${id}`);
  };

  if (loading) return <p className="loading-message">Loading projects...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="container">
      <h2>Projects</h2>
      <Link to="/projects/add" className="add-button">Add Project</Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project Name</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Project Lead</th>
            <th>Team Members</th> {/* New column for Team Members */}
            <th>Actions</th>
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
              <td>
                {proj.team_lead ? proj.team_lead : 'No team lead'} 
              </td>
              <td>
                {proj.team && proj.team.length > 0 ? (
                  <ul>
                    {proj.team.map((member, index) => (
                      <li key={index}>{member.first_name}</li> 
                    ))}
                  </ul>
                ) : (
                  <p>No team members</p>
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(proj.id)}>Edit</button>
                <button onClick={() => handleDelete(proj.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
