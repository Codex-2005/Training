// src/components/EmployeeDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';

function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axiosInstance.get(`employees/${id}/`)
      .then(response => setEmployee(response.data))
      .catch(error => console.error("Error fetching employee:", error));
  }, [id]);

  if (!employee) return <p>Loading employee details...</p>;

  return (
    <div>
      <h2>{employee.name}</h2>
      <p>Salary: {employee.salary}</p>
      <p>Designation: {employee.designation}</p>
      <p>Address: {employee.address}</p>
    </div>
  );
}

export default EmployeeDetail;
