import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/loginSlice';
import { useDispatch } from 'react-redux';

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        console.log('Logged out successfully');
        dispatch(logout());
        navigate('/', { replace: true });
    }

    return (
        <>
            <h1>Welcome to the Logout Page</h1>
            <button onClick={handleClick}>로그아웃</button>
        </>
    )
}



export default Logout;