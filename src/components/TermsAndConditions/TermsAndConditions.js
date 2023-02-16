import React from 'react';
import './TermsAndConditions.css';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
    return (
        <div>
            <h3 className='text-success text-center mt-5'>Accepted Terms and Conditions. Thank you. <Link to='/register'>Back to Register</Link></h3>
            
        </div>
    );
};

export default TermsAndConditions;