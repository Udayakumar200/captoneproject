import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BookingPage from './components/Book';
import Mybooking from './components/Mybooking';
import AllRecords from './components/allrecord';
import AdminScreen from './components/admin';
import BusTicket from './components/Ticket';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/mybooking" element={<Mybooking />} />
                    <Route path="/allrecords" element={<AllRecords />} />
                    <Route path="/admin" element={<AdminScreen />} />
                    <Route path="/busticket" element={<BusTicket />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
