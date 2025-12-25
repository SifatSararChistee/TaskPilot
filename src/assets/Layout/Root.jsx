import React from 'react';
import DashboardPage from '../../Pages/DashboardPage';
import AuthLayout from './AuthLayout';

const Root = () => {

    const user = false
    return (
        <div>
        {user ? <DashboardPage></DashboardPage>: <AuthLayout></AuthLayout>}
        </div>
    );
};

export default Root;