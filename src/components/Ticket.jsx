import React from 'react';
const BusTicket = ({ date, name, noOfPass, from, to, busName }) => {
  return (
    <div>
      <h2 className="text-center">Bus Ticket</h2>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <label>Date of Departure:</label>
            <div className="textColor">
              <p>{date}</p>
            </div>
          </div>
          <div className="col-md-6">
            <label>Name of Primary Passenger:</label>
            <div className="textColor">
              <p>{name}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Ticket No:</label>
            <div className="textColor">#123456</div>
          </div>
          <div className="col-md-6">
            <label>No. of Passengers Traveling:</label>
            <div className="textColor">
              <p>{noOfPass}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Departure:</label>
            <div className="textColor">
              <p>{from}</p>
            </div>
          </div>
          <div className="col-md-6">
            <label>Destination:</label>
            <div className="textColor">
              <p>{to}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Bus Name:</label>
            <div className="textColor">
              <p>{busName}</p>
            </div>
          </div>
        </div>
      </div>
      <h4 className="text-center">Note: Along with the ticket bring Primary Passenger's ID Proof.</h4>
    </div>
  );
};

export default BusTicket;
