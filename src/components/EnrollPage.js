import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EnrollPage = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [message, setMessage] = useState('');

    // Fetch available courses from the server
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/courses');
                setCourses(response.data.courses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    // Handle course enrollment
    const handleEnroll = async () => {
        if (!selectedCourseId) {
            setMessage('Please select a course to enroll in.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/enroll', { courseId: selectedCourseId });
            if (response.data.success) {
                setMessage('Successfully enrolled in the course!');
            } else {
                setMessage('Enrollment failed. Please try again.');
            }
        } catch (error) {
            console.error('Error enrolling in course:', error);
            setMessage('An error occurred while enrolling in the course.');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Enroll in a Course</h2>
            <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                style={styles.select}
            >
                <option value="">Select a course...</option>
                {courses.map(course => (
                    <option key={course._id} value={course._id}>
                        {course.title}
                    </option>
                ))}
            </select>
            <button style={styles.button} onClick={handleEnroll}>
                Enroll
            </button>
            {message && <p>{message}</p>}
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
        borderRadius: '5px',
    },
    select: {
        padding: '10px',
        fontSize: '16px',
        width: '100%',
        marginBottom: '20px',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#007BFF',
        color: '#FFF',
        border: 'none',
        cursor: 'pointer',
    },
};

export default EnrollPage;
