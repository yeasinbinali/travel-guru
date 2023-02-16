import React from 'react';
import { useLoaderData } from 'react-router';
import DestinationDetail from '../DestinationDetail/DestinationDetail';
import './Home.css';

const Home = () => {
    const destinations = useLoaderData();
    return (
        <div className='home-container container'>
            {
                destinations.map(destination => <DestinationDetail
                    destination = {destination}
                    key = {destination.id}
                ></DestinationDetail>)
            }
        </div>
    );
};

export default Home;