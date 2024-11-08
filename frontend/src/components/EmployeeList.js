// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('employees/')
      .then(response => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching employees:", error));
  }, []);

  if (loading) return <p>Loading employees...</p>;

  return (
    <div>
      <h2>Employees</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.department.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
