import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook for navigation

const AllRecords= () => {
    const history = useNavigate(); // Initialize useHistory hook

    const [data, setData] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/adminScreen/allRecords');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.post(`/adminScreen/delete/${id}`);
            setSuccess(true);
            fetchData();
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    const handleDashboardClick = () => {
        history.push('/adminScreen'); // Navigate to the 'adminScreen' route
    };

    const handleLogoutClick = () => {
        history.push('/logout'); // Navigate to the 'logout' route
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
                                    <h4>Hi, Welcome <span>Your Name</span></h4>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn anchor" onClick={handleDashboardClick}>
                                        <i className="fa fa-arrow-circle-o-left"></i>Dashboard
                                    </button>
                                </div>
                                <div className="col-md-3" style={{ marginLeft: '124px' }}>
                                    <button className="btn anchor" onClick={handleLogoutClick}>
                                        <i className="fa fa-arrow-circle-o-left"></i>&nbsp;Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <br /><br /><br /><br /><br /><br /><br />
            <div className="container">
                {success && <div className="alert alert-info">Record deleted successfully.</div>}
                <div className="row">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="container">
                            <div className="row">
                                <div className="container">
                                    {data && data.length > 0 &&
                                        <table border="1" className="table table-striped table-responsive-md">
                                            <thead>
                                                <tr>
                                                    <th>From</th>
                                                    <th>To</th>
                                                    <th>Time</th>
                                                    <th>BusName</th>
                                                    <th>Price</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map(bus => (
                                                    <tr key={bus.id}>
                                                        <td>{bus.fromDestination}</td>
                                                        <td>{bus.toDestination}</td>
                                                        <td>{bus.time}</td>
                                                        <td>{bus.BusName}</td>
                                                        <td>{bus.price}</td>
                                                        <td>
                                                            <button className="btn btn-primary" onClick={() => handleDelete(bus.id)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    }
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AllRecords;
