import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SARCPage from './pages/AboutUs';
import AlumniGrid from './pages/Alum';
import Initiatives from './pages/Initiatives';
import Gallery from './pages/Gallery';
import Contact from './components/Contact/Contact';
import Blogs from './pages/Blogs';
import JoinUs from './pages/JoinUs';
import UpcomingEvents from './pages/UpcomingEvents';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/initiatives" element={<Initiatives />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />  
        <Route path="/aboutUs" element={<SARCPage />} />
        <Route path="/alum" element={< AlumniGrid/>} />
        <Route path="/join-us" element={<JoinUs />} />
        <Route path="/upcomingEvents" element={<UpcomingEvents />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Login/>} />
      </Routes>
    </Router>
  );
};

export default App;