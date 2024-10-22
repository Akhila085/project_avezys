import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BrowseCourses = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/courses', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Include token if required
                    }
                });
                setCourses(response.data.courses); // Assuming the courses are in response.data.courses
                setFilteredCourses(response.data.courses); // Initially display all courses
            } catch (error) {
                console.error('Error fetching courses:', error);
                alert('Failed to fetch courses. Please try again later.');
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        const filterCourses = () => {
            let updatedCourses = courses;

            if (searchTerm) {
                updatedCourses = updatedCourses.filter(course =>
                    course.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            if (selectedCategory && selectedCategory !== 'All') {
                updatedCourses = updatedCourses.filter(course =>
                    course.category === selectedCategory
                );
            }

            setFilteredCourses(updatedCourses);
        };

        filterCourses();
    }, [searchTerm, selectedCategory, courses]);

    const handleEnroll = async (courseId) => {
        try {
            const response = await axios.post('http://localhost:3001/api/enroll', { courseId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Include token if required
                }
            });

            if (response.data.success) {
                alert('Successfully enrolled in the course!');
                navigate('/enroll'); // Navigate to the EnrollPage
            } else {
                alert('Enrollment failed. Please try again.');
            }
        } catch (error) {
            console.error('Error enrolling in course:', error);
            alert('An error occurred while enrolling in the course.');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Browse Courses</h2>
            <div style={styles.filters}>
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.input}
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={styles.select}
                >
                    <option value="All">All Categories</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                </select>
            </div>
            <ul style={styles.courseList}>
                {filteredCourses.length > 0 ? (
                    filteredCourses.map(course => (
                        <li key={course._id} style={styles.courseItem}>
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            <p>Category: {course.category}</p>
                            <button style={styles.button} onClick={() => handleEnroll(course._id)}>
                                Enroll
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No courses found.</p>
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

export default BrowseCourses;
