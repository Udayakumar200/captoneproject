import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom

const AdminScreen = () => {
    const [busDetails, setBusDetails] = useState({
        fromDestination: '',
        toDestination: '',
        filterDate: '',
        price: '',
        busName: '',
        time: ''
    });
    const [success, setSuccess] = useState(false);
    const history = useNavigate(); // Initialize the history object

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBusDetails({ ...busDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/adminScreen', busDetails);
            setSuccess(true);
            // Clear form fields upon successful upload
            setBusDetails({
                fromDestination: '',
                toDestination: '',
                filterDate: '',
                price: '',
                busName: '',
                time: ''
            });
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    // Define function to navigate to all records
    const handleAllRecordsClick = () => {
        history.push('/adminScreen/allRecords');
    };

    // Define function to handle logout
    const handleLogoutClick = () => {
        history.push('/logout');
    };

    return (
        <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <h1>Bus Reservation Admin Dashboard</h1>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3">
                                    <h4>Hi, Welcome <span>Your Name</span></h4>
                                </div>
                                <div className="col-md-3">
                                    {/* Use handleAllRecordsClick function for navigation */}
                                    <button className="btn anchor" onClick={handleAllRecordsClick}>All Records</button>
                                </div>
                                <div className="col-md-3">
                                    {/* Use handleLogoutClick function for navigation */}
                                    <button className="btn anchor" onClick={handleLogoutClick}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <br /><br /><br /><br /><br /><br /><br />
            <div className="container">
                {success && <div className="alert alert-info">Uploaded Successfully.</div>}
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="from">From</label>
                                        <input id="from" className="form-control" name="fromDestination" value={busDetails.fromDestination} onChange={handleChange} required autoFocus />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="to">To</label>
                                        <input id="to" className="form-control" name="toDestination" value={busDetails.toDestination} onChange={handleChange} required autoFocus />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="filterDate">Date</label>
                                        <input type="date" className="form-control" name="filterDate" value={busDetails.filterDate} onChange={handleChange} required autoFocus />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="price">Price</label>
                                        <input id="price" className="form-control" name="price" value={busDetails.price} onChange={handleChange} required autoFocus />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="busName">Bus Name</label>
                                        <input id="busName" className="form-control" name="busName" value={busDetails.busName} onChange={handleChange} required autoFocus />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="time">Departure Time</label>
                                        <input id="time" className="form-control" type="time" name="time" value={busDetails.time} onChange={handleChange} required autoFocus />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary" style={{ marginTop: '25px' }}>Upload</button>
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

export default AdminScreen;
