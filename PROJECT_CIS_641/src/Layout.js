// src/Layout.js

import React from 'react';
import Header from './Header'; // Adjust this path if necessary
import { useTheme } from './ThemeContext';


const Layout = ({ children , isLoggedIn ,onLogout }) => {
    const { isDarkTheme } = useTheme();

    const themeStyles = {
        backgroundColor: isDarkTheme ? '#333' : '#f8f8f8',
        color: isDarkTheme ? '#f8f8f8' : '#333',
        minHeight: '100vh',
    };
    return (
        <div style={themeStyles}>
            {isLoggedIn && <Header onLogout={onLogout}/>}
            <main>{children}</main> {/* This is where page content will be rendered */}
        </div>
    );
};

export default Layout;
