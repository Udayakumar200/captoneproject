import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use Axios to send login request to the Spring Boot controller
            const response = await axios.post('http://localhost:8082/registration', formData);
            if (response.status === 200) {
                // Navigate to dashboard if login successful
                window.location.href = '/dashboard';
            }
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                autoFocus
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
                        <Link to="/dashboard">
                        <button type="submit" className="btn btn-primary">Log In</button>
                    </Link>
                    </form>
                    <span>New User? <a href="/registration">Register here</a></span>
                </div>
            </div>
        </div>
    );
};

export default Login;