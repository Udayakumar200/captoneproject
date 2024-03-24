import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook for navigation
import axios from 'axios';

const Dashboard = () => {
    const history = useNavigate(); // Initialize useHistory hook

    // State for form data
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        filterDate: ''
    });

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use Axios to send form data to the server
            const response = await axios.post('http://localhost:8082/dashboard', formData);
            if (response.status === 200) {
                // Handle successful form submission, such as showing a success message
                console.log('Booking request successful!');
            }
        } catch (error) {
            // Handle errors, such as displaying an error message or logging the error
            console.error('Error submitting booking request:', error);
        }
    };

    // Navigation handlers
    const handleMyBookingsClick = () => {
        history('/Booking'); // Navigate to the 'myBookings' route
    };

    const handleLogoutClick = () => {
        history('/login'); // Navigate to the 'login' route
    };

    return (
        <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <h1>Bus Reservation Dashboard</h1>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3">
                                    <h4> Hi, Welcome</h4>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn anchor" onClick={handleMyBookingsClick}>My Bookings</button>
                                </div>
                                <div className="col-md-3">
            
                                </div>
                                <div className="col-md-3">
                                    <button className="btn anchor" onClick={handleLogoutClick}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <br/><br/><br/><br/><br/><br/><br/>

            <div className="container">
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        <div className="container">
                            <div className="row">
                                <h3 style={{ marginLeft: '400px', color: 'Red' }}>FIND YOUR BUS</h3>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="form-group" style={{ width: '50%' }}>
                                        <label className="control-label" htmlFor="from"> From </label>
                                        <input
                                            id="from"
                                            className="form-control"
                                            name="from"
                                            value={formData.from}
                                            onChange={handleChange}
                                            required
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group" style={{ width: '50%' }}>
                                        <label className="control-label" htmlFor="to"> To </label>
                                        <input
                                            id="to"
                                            className="form-control"
                                            name="to"
                                            value={formData.to}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="filterDate"> Date </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="filterDate"
                                            value={formData.filterDate}
                                            onChange={handleChange}
                                            required
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <button type="submit" className="button" style={{ marginTop: '24px' }}>Find</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
