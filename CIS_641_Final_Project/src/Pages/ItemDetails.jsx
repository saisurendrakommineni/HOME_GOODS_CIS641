import React from 'react';

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";

function Details() {
    const { item, category } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [itemId, setItemId] = useState(null); // Add this line to define itemId state

    useEffect(() => {
        const dbRef = ref(getDatabase());

        console.log("Fetching details for:", { category, item });

        // Fetch all items in the specified category
        get(child(dbRef, `items/${category}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const itemsData = snapshot.val();
                    // Find the item that matches the item name
                    const itemDetails = Object.entries(itemsData).find(([id, i]) => i.name.trim().toLowerCase() === item.trim().toLowerCase());
                    
                    if (itemDetails) {
                        const [id, itemData] = itemDetails; // Destructure to get item ID and data
                        setDetails(itemData);
                        setItemId(id); // Store the unique item ID
                    } else {
                        console.log("Item not found in category.");
                        setDetails(null);
                    }
                } else {
                    console.log("No data available for this category.");
                    setDetails(null);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setLoading(false);
            });
    }, [category, item]);

    const handleEditPage = () => {
        if (itemId) {
            navigate(`/editdetails/${category}/${itemId}`); // Use the unique itemId
        } else {
            console.error("Item ID is undefined.");
        }
    };

    const handleback=()=>{
        navigate(`/item-types/${category}`)
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!details) {
        return <div>Item not found.</div>;
    }

    return (
        <div>
            <div>
            <button onClick={handleback}>Back</button>
            <h1>Item Details: {details.name}</h1>
            <button onClick={handleEditPage}>Edit Item Details</button>
            </div>
            <div>
                <p>Item Category: {details.category}</p>
                <p>Item Name: {details.name}</p>
                <p>Item Stock: {details.details}</p>
                <p>Item Reviews: {details.reviews}</p>
                <p>Item Rating: {details.rating}</p>
                
                {details.image && (
                    <img
                        src={details.image}
                        alt={`${details.name}`}
                        style={{ maxWidth: "200px", margin: "10px 0" }}
                    />
                )}
            </div>
        </div>
    );
}

export default Details;












// // import styles from './ItemCategories.module.css';
// import { useParams } from "react-router-dom";
// import {useNavigate } from "react-router-dom";


// function Details({details_item})
// {
//     const navigate=useNavigate()
//     const handle_details_page=(item_name)=>{
//         navigate(`/editdetails/${item_name}`)
//     }
//     const{item}=useParams()
//     const filter_items=details_item.filter(items=>items.name === item)
//     // console.log(filter_items[0].name)
//     return(
//     <div>
//         <div>
//             <h1>Item Details {item}</h1>
//             {/* <h1>category name :{filter_items[0].category}</h1> */}
//         </div>
       
//        <div>
//             {filter_items.map((details )=>
            
//          <div key={details.id}>

//             <div>
//             <button onClick={()=>handle_details_page(details.name)}>Edit Item Details</button>
//         </div> 

//             <div> 


                
//                 <p> Item Category: {details.category}</p>
//                 <p> Item name: {details.name}</p>
//                 <p> Item Details: {details.details}</p>
//                 <p> Item Reviews: {details.Reviews}</p>
//                 {/* below details.image_1 && used because we want display image if only item has image */}
              
//                  <p>{details.Rating}</p>
//                  {details.Image_1 && <img src={details.Image_1} alt={`${details.name} `} />}
//             </div>
//         </div>
//         )}
//         </div>
//     </div>
//     )
// }
// export default Details;