// src/components/DepartmentSalary.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const DepartmentSalary = () => {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await api.get('/departments/total-salary/');
        setSalaries(response.data);
      } catch (error) {
        console.error('Failed to fetch salaries:', error);
        setError('Failed to fetch salaries.');
      } finally {
        setLoading(false);
      }
    };

    fetchSalaries();
  }, []);

  if (loading) return <p>Loading salaries...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Total Salaries by Department</h2>
      <ul>
        {salaries.map((department, index) => (
          <li key={index}>
            {department.department_name}: ${department.total_salary.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentSalary;
