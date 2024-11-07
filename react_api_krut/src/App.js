// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import DepartmentList from './components/DepartmentList';
import AddDepartment from './components/AddDepartment';
import ProjectList from './components/ProjectList';
import AddProject from './components/AddProject';
// import ProjectStatus from './components/ProjectStatus'; 
import HighestSalary from './components/highestsalary'; 
import SecondHighestSalary from './components/secondhighest';
import ProjectBudget from './components/ProjectBudget';
import './App.css';
// import DepartmentInfo from './components/DepartmentInfo';
// okokok
const App = () => {
  return (
    <Router>
      <div className="app">
        <h1>Management App</h1>
        <nav className="nav">
          <Link to="/employees">Employees</Link> |{' '}
          <Link to="/departments">Departments</Link> |{' '}
          {/* <Link to="/departments/:id">Departments Info</Link> */}
          <Link to="/projects">Projects</Link> |{' '}
          {/* <Link to="/projects/status">Project Status</Link> |{' '} */}
          <Link to="/highest-salary">Highest Salary</Link> |{' '}
          <Link to="/second-highest-salary">Second Highest Salary</Link>
        </nav>

        <Routes>
          {/* Employee Routes */}
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<AddEmployee />} />

          {/* Department Routes */}
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/departments/add" element={<AddDepartment />} />
          {/* <Route path="/departments/:fid" element={<DepartmentInfo />} /> Updated route for DepartmentInfo */}

          {/* Project Routes */}
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/add" element={<AddProject />} />
          {/* <Route path="/projects/status" element={<ProjectStatus />} /> */}
          <Route path="/projects/:fid/budget" element={<ProjectBudget />} /> {/* Updated route for ProjectBudget */}

          {/* Salary Routes */}
          <Route path="/highest-salary" element={<HighestSalary />} />
          <Route path="/second-highest-salary" element={<SecondHighestSalary />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
