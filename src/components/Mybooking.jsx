import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Mybooking = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Fetch booking data from the backend when the component mounts
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/booking');
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []); // Empty dependency array to ensure useEffect runs only once

    const cancelBooking = async (id) => {
        try {
            await axios.delete(`/bookings/${id}`);
            // Remove the canceled booking from the state
            setBookings(bookings.filter(booking => booking.id !== id));
        } catch (error) {
            console.error('Error canceling booking:', error);
        }
    };

    const generateTicket = async (id) => {
        try {
            // Implement ticket generation logic here
            console.log(`Ticket generated for booking with id ${id}`);
        } catch (error) {
            console.error('Error generating ticket:', error);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                {/* Navbar code */}
            </nav>

            <br /><br /><br /><br /><br /><br /><br />

            <div className="container">
                <div className="row">
                    <table border="1" className="table table-striped table-responsive-md">
                        <thead>
                            <tr>
                                <th>From</th>
                                <th>To</th>
                                <th>Departure Time</th>
                                <th>Bus Name</th>
                                <th>No of Passengers</th>
                                <th>Total Amount Paid</th>
                                <th>Trip Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={index}>
                                    <td>{booking.from}</td>
                                    <td>{booking.to}</td>
                                    <td>{booking.departureTime}</td>
                                    <td>{booking.busName}</td>
                                    <td>{booking.numPassengers}</td>
                                    <td>{booking.totalAmount}</td>
                                    <td>{booking.tripStatus}</td>
                                    <td>
                                        <button onClick={() => cancelBooking(booking.id)} className="btn btn-primary">Cancel</button>
                                        <Link to={`/ticket/${booking.id}`} className="btn btn-primary">Generate Ticket</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Mybooking;
