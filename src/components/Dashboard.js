import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/enrolled-courses');
                setEnrolledCourses(response.data);
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
            }
        };

        fetchEnrolledCourses();
    }, []);

    return (
        <div style={styles.container}>
            <h2>Your Enrolled Courses</h2>
            <ul style={styles.courseList}>
                {enrolledCourses.length > 0 ? (
                    enrolledCourses.map(course => (
                        <li key={course._id} style={styles.courseItem}>
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                        </li>
                    ))
                ) : (
                    <p>You have not enrolled in any courses.</p>
                )}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    filters: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        width: '70%',
    },
    select: {
        padding: '10px',
        fontSize: '16px',
        width: '25%',
    },
    courseList: {
        listStyleType: 'none',
        padding: 0,
    },
    courseItem: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginBottom: '15px',
        padding: '10px',
        textAlign: 'left',
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

export default Dashboard;
