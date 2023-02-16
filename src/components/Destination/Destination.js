import React, {useState} from "react";
import "./Description.css";
import { useLoaderData } from "react-router";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom";

const Destination = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const destination = useLoaderData();
  const { destinationName, description } = destination;

  return (
    <div className="description-calendar container">
      <div className="description">
        <h1><b>{destinationName}</b></h1>
        <p>{description}</p>
      </div>
      <div className="calendar">
        <p className="m-0">
          <small><b>Origin</b></small><br />
          <input name="text" type="text" required/>
        </p>
        <p className="m-0">
          <small><b>Destination</b></small>
          <br />
          <input name="text" placeholder={destinationName} readOnly type="text" />
        </p>
        <div className='calendar-from-to'>
          <div>
            <small><b>From</b></small>
            <DatePicker minDate={new Date()} dateFormat='dd/MM/yyyy' selected={startDate} onChange={date => setStartDate(date)}></DatePicker>
          </div>
          <div>
            <small><b>To</b></small>
            <DatePicker minDate={new Date()} dateFormat='dd/MM/yyyy' selected={endDate} onChange={date => setEndDate(date)}></DatePicker>
          </div>
        </div>
        <Link to='/booking'>Start Booking</Link>
      </div>
    </div>
  );
};

export default Destination;
