import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../Hooks/useAuth';
import Loading from '../Components/Layout/Loading';

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <Loading />;
    }
    
    // If user is already logged in, redirect to dashboard
    if (user && user?.email) {
        return <Navigate to="/" replace />;
    }
    
    // Otherwise, show the public page (login/register)
    return children;
};

export default PublicRoute;