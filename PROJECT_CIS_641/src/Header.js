// src/Header.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Make sure this path is correct
import { signOut } from 'firebase/auth';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out from Firebase
            navigate('/'); // Redirect to login page
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '2px', background: '#f8f8f8', borderBottom: '1px solid #ccc'}}>
            <h1>Home Goods Inventory Management System</h1>
            <button style={{height:40,margin:20,borderRadius:5,fontWeight:'bold'}}onClick={handleLogout}>Logout</button>
        </header>
    );
};

export default Header;
