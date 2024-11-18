// installation packages
// npm install react-router-dom
// npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
import React from 'react';

import './LoginPage.module.css';
import { useReducer, useState,useEffect } from "react";
import { database } from './firebase';
import { getDatabase, ref, set,onValue } from "firebase/database";
import { ThemeProvider } from './ThemeContext';
import Login from './LoginPage';
import CreateAccount from './CreateAccount';
import Success from './AccountCreationSuccessful';
import ItemCategories from './Pages/ItemCategories';
import AddCategory from './Pages/AddItemCategory';
import ItemTypes from './Pages/ItemTypes';
import AddItemType from './Pages/AddItemType';
import Details from './Pages/ItemDetails';
import EditDetails from './Pages/EditItemDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout'; // Import the Layout component
import ForgotPassword from './ForgotPassword'; 
import InventoryCounter from "./InventoryCounter";



function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });

    // Function to set login status to true when user logs in
    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true'); // Save to local storage
    };

    // Function to set login status to false when user logs out
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn'); // Remove from local storage
    };


    const [categories, setCategories] = useState(['Furniture', 'Decor', 'Appliances', 'Tools', 'Kitchen Ware']);

    const addCategory = (newCategory) => {
        setCategories(prevCategories => [...prevCategories, newCategory]);
    };

    const handleDelete = (deleteItem) => {
        const updated = categories.filter(categoryDelete => categoryDelete !== deleteItem);
        setCategories(updated);
    };

    const itemTypes = [
        { id: 1, category: "Furniture", name: "Sofa", details: "Blue color", reviews: 100, rating: 5, image: "/Assets/download.jpg" },
        { id: 2, category: "Decor", name: "Chair", details: "Small", reviews: 700, rating: 3, image: "/Assets/chair.jpg" },
        { id: 3, category: "Appliances", name: "Electric", details: "Huge", reviews: 1200, rating: 4.5 },
        { id: 4, category: "Tools", name: "Screw Driver", details: "100", reviews: 900, rating: 3.5 },
        { id: 5, category: "Kitchen Ware", name: "Spoon", details: "900", reviews: 70, rating: 5 },
        { id: 6, category: "Furniture", name: "Bed", details: "9*9", reviews: 7000, rating: 4.9 },
    ];   

    const reducer = (types, action) => {
        switch (action.type) {
            case 'addItem':
                return [...types, action.payload];
            case 'editItem':
                return types.map(item => 
                    item.id === action.payload.id ? { ...action.payload } : item
                );
            default:
                return types;
        }
    }

   const [items, dispatch] = useReducer(reducer, itemTypes);

 

//   const uploadItemsToFirebase = async () => {
//       const db = getDatabase();

//       for (const item of itemTypes) {
//           const itemRef = ref(db, `items/${item.category}/${item.id}`); // Path for items
//           await set(itemRef, item) // Write each item to the database
//               .then(() => {
//                   console.log(`Uploaded ${item.name} successfully!`);
//               })
//               .catch((error) => {
//                   console.error("Error uploading item: ", error);
//               });
//       }
//   };

//   useEffect(() => {
      
//       uploadItemsToFirebase(); // Call the item upload function on component mount
//   }, []);

    return (
        <ThemeProvider>
        <Router>
            <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
                <div className="App">
                    
                    <Routes>
                        <Route path="/" element={<Login onLogin={handleLogin}/>} />
                        <Route path="/create-account" element={<CreateAccount />} />
                        <Route path="/account_success" element={<Success />} />
                        <Route path="/item-categories" element={<ItemCategories categories={categories} handleDelete={handleDelete} />} />
                        <Route path="/add-item-categories" element={<AddCategory addCategory={addCategory} />} />
                        <Route path="/item-types/:category" element={<ItemTypes items={items} />} /> 
                        <Route path="/add-item-type/:categorys" element={<AddItemType addItem={(newItem) => dispatch({ type: 'addItem', payload: newItem })} />} />
                        <Route path="/details/:category/:item" element={<Details items={items} />} /> 
                        {/* <Route path="/editdetails/:category/:item" element={<EditDetails items={items} dispatch={dispatch} />} />  */}
                        <Route path="/editdetails/:category/:itemId" element={<EditDetails />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* New Route */}
                        <Route path="/inventory" element={<InventoryCounter />} />
                        
                        {/* <Route path="/editdetails/:category/:item" element={<EditDetails />} /> */}
                    </Routes>
                </div>
            </Layout>
        </Router>
        </ThemeProvider>
    );
}

export default App;


// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
