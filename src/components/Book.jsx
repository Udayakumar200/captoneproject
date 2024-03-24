import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook for navigation

const BookingPage = () => {
    const history = useNavigate(); // Initialize useHistory hook

    const [record, setRecord] = useState({
        fromDestination: '',
        toDestination: '',
        filterDate: '',
        price: '',
        noOfPersons: '',
        totalCalculated: '',
        busName: '',
        time: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/dashboard/Mybooking', record);
            if (response.status === 200) {
                // Navigate to a different route upon successful form submission
                history.push('/dashboard'); // Navigate to the 'dashboard' route
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
        }
    };

    const updateFiled = () => {
        const price = document.getElementById("price").value;
        const totalpassenger = document.getElementById("noOfPersons").value;
        const totalValue = price * totalpassenger;
        setRecord({ ...record, totalCalculated: totalValue });
    };

    return (
        <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <h2>Booking Page</h2>
                        <div className="container">
                            <div><h4> Hi, Welcome</h4></div>
                        </div>
                    </div>
                </div>
            </nav>

            <br /><br /><br /><br /><br /><br /><br />

            <div className="container">
                <div className="row">
                    <h1>Booking</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="container">
                            <div className="row">
                                {/* Form fields */}
                            </div>
                            <div className="row">
                                {/* Form fields */}
                            </div>
                            <div className="row">
                                {/* Form fields */}
                            </div>
                            <div className="row">
                                {/* Form fields */}
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary" style={{ marginTop: '25px' }}> Pay </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
