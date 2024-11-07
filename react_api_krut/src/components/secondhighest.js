// src/components/SecondHighestSalary.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const SecondHighestSalary = () => {
  const [secondHighestSalary, setSecondHighestSalary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSecondHighestSalary = async () => {
      try {
        const response = await api.get('/employees/second-highest-salary/');
        setSecondHighestSalary(response.data); 
      } catch (error) {
        console.error('Failed to fetch second highest salary:', error);
        setError('Failed to fetch second highest salary.');
      } finally {
        setLoading(false);
      }
    };
    fetchSecondHighestSalary();
  }, []);

  if (loading) return <p>Loading second highest salary...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Second Highest Salary Holder(s)</h2>
      {secondHighestSalary ? (
        <div>
          
          <ul>
            {secondHighestSalary.employees.map(emp => (
              <p key={emp.id}>{`ID: ${emp.id}, Name: ${emp.first_name}, Salary: ${emp.salary}`}</p>
            ))}
          </ul>
        </div>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default SecondHighestSalary;
