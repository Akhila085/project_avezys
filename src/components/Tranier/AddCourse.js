import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Development');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh

        try {
            const response = await axios.post('http://localhost:3001/api/courses', {
                title,
                description,
                category,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Include token if required
                }
            });

            if (response.data.success) {
                alert('Course added successfully!');
                navigate('/browse'); // Redirect to BrowseCourses after successful addition
            } else {
                alert('Failed to add course. Please try again.');
            }
        } catch (error) {
            console.error('Error adding course:', error);
            alert('An error occurred while adding the course.');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Add Course</h2>
            <form onSubmit={handleSubmit}>
                <div style={styles.inputGroup}>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={styles.textarea}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={styles.select}
                    >
                        <option value="Development">Development</option>
                        <option value="Design">Design</option>
                        <option value="Business">Business</option>
                    </select>
                </div>
                <button type="submit" style={styles.button}>Add Course</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    inputGroup: {
        marginBottom: '15px',
        textAlign: 'left',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        resize: 'vertical',
    },
    select: {
        padding: '10px',
        fontSize: '16px',
        width: '100%',
    },
    button: {
        padding: '10px 15px',
        fontSize: '16px',
        backgroundColor: '#007BFF',
        color: '#FFF',
        border: 'none',
        cursor: 'pointer',
    },
};

export default AddCourse;
