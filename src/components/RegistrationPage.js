import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessage(''); // Clear error message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/signup', formData);
      if (response.data.token) { // Check if token exists in response
        setSuccessMessage('Registration successful! You can now log in.'); // Set success message
        setErrorMessage(''); // Clear error message
        setTimeout(() => {
          navigate('/login'); // Redirect after a short delay
        }, 2000); // Redirects after 2 seconds
      } else {
        setErrorMessage(response.data.message); // Set error message if token is not returned
      }
    } catch (error) {
      // Capture error message from response
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message); // Set error message from backend response
      } else {
        setErrorMessage('An error occurred during registration.'); // General error message
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:3001/api/google-auth', {
        token: credentialResponse.credential,
      });
      if (response.data.success) {
        alert('Google login successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error with Google login:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      {successMessage && <div style={styles.successMessage}>{successMessage}</div>} {/* Render success message */}
      {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>} {/* Render error message */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
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
        <button type="submit" style={styles.button}>Register</button>
      </form>

      <div style={styles.socialLogin}>
        <h3>Or sign up with:</h3>
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
  successMessage: {
    color: 'green',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
};

export default RegistrationPage;
