//installation packages
// npm install react-router-dom
//npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
import './LoginPage.module.css';
import { useReducer, useState } from "react";

import Login from './LoginPage';
import CreateAccount from './CreateAccount';
import Success from './AccountCreationSuccessful';
import Itemcategories from './Pages/ItemCategories';
import Addcategory from './Pages/AddItemCategory';
import Itemtypes from './Pages/ItemTypes';
import Additemtype from './Pages/AddItemType';
import Details from './Pages/ItemDetails';
import EditDetails from './Pages/EditItemDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  const [categories, setCategories] = useState(['Furniture', 'Decor', 'Appliances', 'Tools', 'Kitchen Ware']);

    const addCategory = (newCategory) => {
        setCategories(prevCategories => [...prevCategories, newCategory]);
    };

    const handleDelete=(deleteitem)=>{
      const updated= categories.filter(category_delete => category_delete!==deleteitem)
      setCategories(updated)
   }
   const item_types=[
    {id:1,category:"Furniture",name:"Sofa",details:"Blue color",Reviews:100,Rating:5,Image_1:"/Assets/download.jpg"},
    {id:2,category:"Decor",name:"chair",details:"Small",Reviews:700,Rating:3,Image_1:"/Assets/chair.jpg"},
    {id:3,category:"Appliances",name:"Electric",details:"huge",Reviews:1200,Rating:4.5},
    {id:4,category:"Tools",name:"Screw Driver",details:"100",Reviews:900,Rating:3.5},
    {id:5,category:"Kitchen Ware",name:"Spoon",details:"900",Reviews:70,Rating:5},
    {id:6,category:"Furniture",name:"bed",details:"9*9",Reviews:7000,Rating:4.9},
   ]   
   const reducer=(types,action)=>{
      switch(action.type)
      {
        case 'addItem':
          return[...types,action.payload]
          default:
            return types
      }
   }
   const[items,dispatch]=useReducer(reducer,item_types)
 
  return (
    
    <Router>
    <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/account_success" element={<Success/>}></Route>
          <Route path="/item-categories" element={<Itemcategories categories={categories} handleDelete={handleDelete}/>}></Route>
          <Route path="/add-item-categories" element={<Addcategory addCategory={addCategory}/>}></Route>
          <Route path="/item-types/:category" element={<Itemtypes items={items}/>}></Route> 
          {/* afte adding additemtypes.js items={items} before it was items={item_types} */}
          {/* above "category" name must be use in use params ItemTypes.js file */}
          <Route path="/add-item-type" element={<Additemtype dispatch={dispatch}/>}></Route> 
          <Route path="/details/:item" element={<Details details_item={items}/>}></Route> 
          <Route path="/editdetails" element={<EditDetails/>}></Route> 

        </Routes>
    </div>
    </Router>
  );
}

export default App;


