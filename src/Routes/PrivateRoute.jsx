import React from 'react';
import Loading from '../Components/Layout/Loading';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../Hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    
    if (loading) {
        return <Loading />;
    }
    
    if (user && user?.email) {
        return children;
    }
    
    // Redirect to login if not authenticated
    return <Navigate state={{ from: location.pathname }} to="/auth/login" replace />;
};

export default PrivateRoute;