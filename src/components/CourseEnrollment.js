import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseEnrollmentPage = () => {
    const [courses, setCourses] = useState([]);
    const [enrollmentMessage, setEnrollmentMessage] = useState('');

    useEffect(() => {
        // Fetch courses from the backend
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/courses'); // Adjust the endpoint as needed
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleEnroll = async (courseId) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/enroll/${courseId}`); // Adjust the endpoint as needed
            if (response.data.success) {
                setEnrollmentMessage('Successfully enrolled in the course!');
            } else {
                setEnrollmentMessage('Failed to enroll in the course. Please try again.');
            }
        } catch (error) {
            console.error('Error enrolling in course:', error);
            setEnrollmentMessage('An error occurred while enrolling in the course.');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Browse and Enroll in Courses</h2>
            {enrollmentMessage && <p>{enrollmentMessage}</p>}
            <div style={styles.courseList}>
                {courses.map((course) => (
                    <div key={course._id} style={styles.courseCard}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <button onClick={() => handleEnroll(course._id)} style={styles.button}>Enroll</button>
                    </div>
                ))}
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
    courseList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    courseCard: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
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

export default CourseEnrollmentPage;
