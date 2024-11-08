// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeDetail from './components/EmployeeDetail';
import DepartmentList from './components/DepartmentList';
import ProjectList from './components/ProjectList';

function App() {
  return (
    <Router>
      <div>
        <h1>Employee Management System</h1>
        <Routes>
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/projects" element={<ProjectList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
