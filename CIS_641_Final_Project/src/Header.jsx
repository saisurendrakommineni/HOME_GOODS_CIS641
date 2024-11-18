// src/Header.js

import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Make sure this path is correct
import { signOut } from 'firebase/auth';
import { useTheme } from './ThemeContext';
import InventoryCounter from "./InventoryCounter";


const Header = ({onLogout}) => {
    const navigate = useNavigate();
    const { isDarkTheme, toggleTheme } = useTheme();
    const [showConfirmation, setShowConfirmation] = useState(false); 
    const [showCounter, setShowCounter] = useState(false);

    const handleCountClick = () => {
        navigate("/inventory"); 
    };

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
    const handleSaveClick = (event) => {
        event.preventDefault();
        setShowConfirmation(true); 
    };
    const handleCancel = () => {
        setShowConfirmation(false); 
    };
   

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '2px', background: '#f8f8f8', borderBottom: '1px solid #ccc'}}>
            <button style={{height:40,margin:20,borderRadius:5,fontWeight:'bold'}} onClick={handlehome}>Home</button>
            <button style={{height:40,margin:20,borderRadius:5,fontWeight:'bold'}} onClick={handleCountClick}>Count </button>{showCounter && <InventoryCounter />}
            <button style={{height:40,margin:20,borderRadius:5,fontWeight:'bold'}} onClick={toggleTheme}>{isDarkTheme ? 'Light Mode' : 'Dark Mode'}</button>
            <button style={{height:40,margin:20,borderRadius:5,fontWeight:'bold'}}onClick={handleSaveClick}>Logout</button>
            {showConfirmation && (
                <div>
                    <p>Are You sure to Logout?</p>
                    <button onClick={handleLogout}>Yes</button>
                    <button onClick={handleCancel}>No</button>
                </div>
            )
            
            }
        </header>
    );
};

export default Header;
