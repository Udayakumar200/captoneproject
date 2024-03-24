import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook for navigation

const Registration = () => {
    const history = useNavigate(); // Initialize useHistory hook

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'USER' // Default role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleSubmit();
        try {
            const response = await axios.post('http://localhost:8082/login', { user: formData }); // Adjust endpoint to match your backend
            if (response.status === 200) {
                history('/login'); // Navigate to the login page
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };
    const handleRegisterClick = () => {
        handleSubmit(); // Call handleSubmit function when the button is clicked
    };
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <h2 className="navbar-brand">Bus Reservation Registration</h2>
                </div>
            </nav>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h1 className="mb-4">Registration</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    autoFocus
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="role">Role</label>
                                <select
                                    id="role"
                                    className="form-control"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>

                            <div className="form-group mt-3">
                                <button type="submit" className="btn btn-primary" onClick={handleRegisterClick}>
                                    Register
                                </button>
                                <span className="ml-2">Already registered? <a href="/login">Login here</a></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
