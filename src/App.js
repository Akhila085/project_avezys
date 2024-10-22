import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import Home from './components/Home';
import RegistrationPage from './components/RegistrationPage';
import Loginpage from './components/Loginpage';
import CourseEnrollment from './components/CourseEnrollment';
import BrowseCourses from './components/BrowseCourses';
import Dashboard from './components/Dashboard';
import EnrollPage from './components/EnrollPage';
import Navbar from './components/Navbar';
import AddCourse from './components/Tranier/AddCourse';

const App = () => {
    const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your actual Google client ID

    return (
        <GoogleOAuthProvider clientId={clientId}> {/* Wrap with GoogleOAuthProvider */}
            <Router>
                <Navbar />
                <Routes>
                <Route path="/" element={<Home />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/login" element={<Loginpage />} />
                    <Route path="/course" element={<CourseEnrollment />}/>
                    <Route path="/browse" element={<BrowseCourses />}/>
                    <Route path="/dash" element={<Dashboard />}/>
                    <Route path="/enroll" element={<EnrollPage />}/>
                    <Route path="/addcoursce" element={<AddCourse />}/>
                    
                </Routes>
            </Router>
        </GoogleOAuthProvider>
    );
};

export default App;
