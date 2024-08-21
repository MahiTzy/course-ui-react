import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddCourse from './pages/AddCourse';
import AddNewInstance from './pages/AddNewInstance';
import Course from './pages/Course';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import InstanceDetail from './pages/InstanceDetail';
import Instances from './pages/Instances';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} >
          <Route path="" element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="course/:id" element={<Course />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="instances" element={<Instances />} />
          <Route path="instance/:year/:semester/:id" element={<InstanceDetail />} />
          <Route path="add-new-instances" element={<AddNewInstance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
