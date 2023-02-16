import React from 'react';
import { Link } from 'react-router-dom';
import './DestinationDetail.css';

const DestinationDetail = (props) => {
    const {id, destinationName, img} = props.destination;
    return (
        <div className='card-container'>
            <img className='card-img' src={img} alt='img'></img>
            <div className='text-block'>
                <h4>{destinationName}</h4>
                <Link to={`/destination/${id}`}>Booking</Link>
            </div>
        </div>
    );
};

export default DestinationDetail;