import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    // Handle logout functionality (if needed)
    const handleLogout = () => {
        // Clear user session or token from localStorage or cookies
        localStorage.removeItem('token'); // Adjust if you are using cookies
        alert('You have been logged out');
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <nav style={styles.navbar}>
            <h1 style={styles.brand}>Avezys</h1>
            <div style={styles.navLinks}>
                <Link to="/" style={styles.link}>Home</Link>
                <Link to="/browse" style={styles.link}>Browse Courses</Link>
                <Link to="/my-courses" style={styles.link}>My Courses</Link>
                <button onClick={handleLogout} style={styles.button}>Logout</button>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#007BFF',
        padding: '10px 20px',
    },
    brand: {
        color: '#FFF',
        fontSize: '24px',
        textDecoration: 'none',
    },
    navLinks: {
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        color: '#FFF',
        textDecoration: 'none',
        marginRight: '20px',
        fontSize: '18px',
    },
    button: {
        backgroundColor: '#FFF',
        color: '#007BFF',
        border: 'none',
        padding: '10px',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default Navbar;
