import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const isLogin = localStorage.getItem('login')

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isLogin ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;