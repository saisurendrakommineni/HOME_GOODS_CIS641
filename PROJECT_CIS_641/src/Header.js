// src/Header.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Make sure this path is correct
import { signOut } from 'firebase/auth';
import { useTheme } from './ThemeContext';


const Header = ({onLogout}) => {
    const navigate = useNavigate();
    const { isDarkTheme, toggleTheme } = useTheme();


    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out from Firebase
            onLogout();
            navigate('/'); // Redirect to login page
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    const handlehome=()=>{
        navigate('/item-categories')
    }

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '2px', background: '#f8f8f8', borderBottom: '1px solid #ccc'}}>
            <button onClick={handlehome}>Home</button>
            <button onClick={toggleTheme}>{isDarkTheme ? 'Light Mode' : 'Dark Mode'}</button>
            <button style={{height:40,margin:20,borderRadius:5,fontWeight:'bold'}}onClick={handleLogout}>Logout</button>
        </header>
    );
};

export default Header;
