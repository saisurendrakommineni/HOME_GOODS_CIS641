import React from 'react';

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { database } from "../firebase";
import { ref, get, update } from "firebase/database";

function EditItemDetails() {
    const { category, itemId } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        name: "",
        details: "",
        reviews: "",
        rating: "",
        image: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching data for category:", category, "and itemId:", itemId); // Log parameters
                const itemRef = ref(database, `items/${category}/${itemId}`);
                const snapshot = await get(itemRef);
                
                if (snapshot.exists()) {
                    const itemData = snapshot.val();
                    console.log("Fetched item data:", itemData); // Log the fetched data
                    setDetails(itemData); // Set form data with fetched details
                } else {
                    console.log("No data available for this item.");
                    setError("No data found for this item.");
                }
            } catch (error) {
                console.error("Error fetching item data: ", error);
                setError("Error fetching item details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category, itemId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            const itemRef = ref(database, `items/${category}/${itemId}`);
            await update(itemRef, details);
            console.log("Item details updated successfully.");
            navigate(`/details/${category}/${details.name}`); // Redirect back to the item details page
        } catch (error) {
            console.error("Error updating item details: ", error);
            setError("Error saving changes. Please try again later.");
        }
    };

    const handleCancelChanges=()=>{
        navigate(`/details/${category}/${details.name}`)
    }

    if (loading) return <p>Loading item details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Edit Item Details</h1>
            <form>
                <div>
                    <label htmlFor="category_name">Category Name:</label>
            <input
                type="text"
                name="name"
                value={details.name || ""}
                onChange={handleInputChange}
                placeholder="Item Name"
            /></div>
            
            <div>
                    <label htmlFor="item_details">Item Details:</label>
            <input type="text"
                name="details"
                value={details.details || ""}
                onChange={handleInputChange}
                placeholder="Item Details"
            /></div>

<div>
<label htmlFor="item_reviews">Reviews:</label>
            <input
                type="text"
                name="reviews"
                value={details.reviews || ""}
                onChange={handleInputChange}
                placeholder="Item Reviews"
            /></div>
             <div>
             <label htmlFor="item_rating">Rating:</label>
            <input
                type="number"
                name="rating"
                value={details.rating || ""}
                onChange={handleInputChange}
                placeholder="Item Rating"
            /></div>
              <div>
              <label htmlFor="item_image">Image URL:</label>
            <input
                type="text"
                name="image"
                value={details.image || ""}
                onChange={handleInputChange}
                placeholder="Image URL"
            /></div>
            <button type="button" onClick={handleSaveChanges}>
                Save Changes
            </button>
            <button type="button" onClick={handleCancelChanges}>
                Cancel Changes
            </button>
            </form>
        </div>
    );
}

export default EditItemDetails;






// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// function EditDetails({ item_details, dispatch }) {
// //    console.log(item_details[0])
//     const { itm } = useParams(); 
//     const navigate = useNavigate();

//     const itemToEdit = item_details.find(i => i.name === itm);
//         // console.log(itemToEdit)

//     const [name, setName] = useState(itemToEdit.name);
//     const [details, setDetails] = useState(itemToEdit.details);
//     const [reviews, setReviews] = useState(itemToEdit.Reviews);
//     const [rating, setRating] = useState(itemToEdit.Rating);
//     const [image, setImage] = useState(itemToEdit.Image_1);

//     const handle_changes = (event) => {
//         event.preventDefault();

//         const UpdatedItem = {
//             ...itemToEdit, 
//             name,
//             details,
//             Reviews: reviews,
//             Rating: rating,
//             Image_1: image
//         };

        
//         dispatch({ type: 'editItem', payload: UpdatedItem });
//         navigate(`/item-types/${itemToEdit.category}`);
//     };

//     return (
//         <div>
//             <div>
//                 <h1>Edit Item Details</h1>
//             </div>

//             <form onSubmit={handle_changes}>
//                 <div>
//                     <label htmlFor="item_type">Item Name:</label>
//                     <input
//                         type="text"
//                         id="item_type"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="item_details">Item Details:</label>
//                     <input
//                         type="text"
//                         id="item_details"
//                         value={details}
//                         onChange={(e) => setDetails(e.target.value)}
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="item_reviews">Reviews:</label>
//                     <input
//                         type="number"
//                         id="item_reviews"
//                         value={reviews}
//                         onChange={(e) => setReviews(e.target.value)}
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="item_rating">Rating:</label>
//                     <input
//                         type="number"
//                         step="0.1"
//                         id="item_rating"
//                         value={rating}
//                         onChange={(e) => setRating(e.target.value)}
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="item_image">Image URL:</label>
//                     <input
//                         type="text"
//                         id="item_image"
//                         value={image}
//                         onChange={(e) => setImage(e.target.value)}
//                     />
//                 </div>

//                 <button type="submit">Edit Item</button>
//             </form>
//         </div>
//     );
// }

// export default EditDetails;
