import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ForgotPassword/ResetPassword';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import Loading from './components/Loading/Loading';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import DirectVerify from './pages/DirectVerify';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssets = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setLoading(false);
    };

    loadAssets();
  }, []);

  return (
    <Router>
      <AuthProvider>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/initiatives" element={<Initiatives />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/contact" element={<Contact />} />  
              <Route path="/aboutUs" element={<SARCPage />} />
              <Route path="/alum" element={<AlumniGrid />} />
              <Route path="/join-us" element={<JoinUs />} />
              <Route path="/upcomingEvents" element={<UpcomingEvents />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path="/verify/:uid/:token" element={<VerifyEmail />} />
              <Route path="/direct-verify/*" element={<DirectVerify />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
              <Route path="/changePassword" element={<ChangePassword />} />      
            </Routes>
          </>
        )}
      </AuthProvider>
    </Router>
  );
};

export default App;