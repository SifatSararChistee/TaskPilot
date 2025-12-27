import React from 'react';
import { Outlet } from 'react-router';


const AuthLayout = () => {
    return (
        <div className="auth-layout">
            {/* You can add auth-specific layout elements here */}
            {/* For example: a logo, background image, etc. */}
            <Outlet /> {/* This will render LoginPage or other auth pages */}
        </div>
    );
};

export default AuthLayout;