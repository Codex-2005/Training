// src/components/HighestSalary.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const HighestSalary = () => {
  const [highestSalary, setHighestSalary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHighestSalary = async () => {
      try {
        const response = await api.get('/employees/highest-salary/');
        setHighestSalary(response.data); 
      } catch (error) {
        console.error('Failed to fetch highest salary:', error);
        setError('Failed to fetch highest salary.');
      } finally {
        setLoading(false);
      }
    };
    fetchHighestSalary();
  }, []);

  if (loading) return <p>Loading highest salary...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Highest Salary Holder</h2>
      {highestSalary ? (
        <p>{`ID: ${highestSalary.id}, Name: ${highestSalary.first_name}, Salary: ${highestSalary.salary}`}</p>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default HighestSalary;
