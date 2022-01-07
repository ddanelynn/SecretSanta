import React from 'react';
import LoadingComponent from './LoadingComponent';
import { Navigate } from 'react-router-dom';


const LogoutComponent = () => {
    localStorage.removeItem('login')

    return (
    <>
      <LoadingComponent />
      <Navigate to="/" />
    </>
    );
}

export default LogoutComponent;
