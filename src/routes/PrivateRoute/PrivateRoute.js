import React, {useContext} from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../contexts/UserContext';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <div className='text-success text-center mt-5'>Loading...</div>
    }
    if(user?.uid){
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;