// src/Layout.js

import React from 'react';
import Header from './Header'; // Adjust this path if necessary

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <main>{children}</main> {/* This is where page content will be rendered */}
        </div>
    );
};

export default Layout;
