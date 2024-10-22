import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Loginpage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/login', formData);
            if (response.data.success) {
                alert('Login successful!');
                navigate('/course-enrollment'); // Redirect to course enrollment page
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred during login.');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post('http://localhost:5000/api/google-auth', {
                token: credentialResponse.credential,
            });
            if (response.data.success) {
                alert('Google login successful!');
                navigate('/course-enrollment'); // Redirect to course enrollment page
            }
        } catch (error) {
            console.error('Error with Google login:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Login</button>
            </form>

            <div style={styles.socialLogin}>
                <h3>Or login with:</h3>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => console.log('Google Login Failed')}
                />
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#007BFF',
        color: '#FFF',
        border: 'none',
        cursor: 'pointer',
    },
    socialLogin: {
        marginTop: '20px',
    },
};

export default Loginpage;
