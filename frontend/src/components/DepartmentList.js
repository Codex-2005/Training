// src/components/DepartmentList.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axiosInstance.get('departments/')
      .then(response => setDepartments(response.data))
      .catch(error => console.error("Error fetching departments:", error));
  }, []);

  return (
    <div>
      <h2>Departments</h2>
      <ul>
        {departments.map(dep => (
          <li key={dep.id}>{dep.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DepartmentList;
