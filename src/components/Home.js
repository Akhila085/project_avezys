import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={styles.container}>
            <h1>Welcome to Avezys!</h1>
            <p style={styles.description}>
                Avezys is your go-to platform for learning, connecting with trainers, and achieving your educational goals. Explore our wide range of courses, enroll today, and start learning at your own pace!
            </p>
            <div style={styles.buttons}>
                
                <Link to="/register" style={styles.button}>
                    Register
                </Link>
                <Link to="/login" style={styles.button}>
                    Login
                </Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
    },
    description: {
        fontSize: '18px',
        lineHeight: '1.6',
        marginBottom: '20px',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap', // Adjust layout on smaller screens
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#FFF',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        textAlign: 'center',
    },
};

export default Home;
