
import styles from './AddItemType.module.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { database } from "../firebase";
import { ref, push, onValue } from "firebase/database";

function AddItemType() {
    const navigate = useNavigate();
    const{categorys}=useParams()
    const [category, setCategory] = useState(""); // Stores selected category
    const [allCategories, setAllCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // Stores the current search term
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [reviews, setReviews] = useState("");
    const [rating, setRating] = useState("");
    const [image, setImage] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false); 


    // Fetch all categories from Firebase on component mount
    useEffect(() => {
        const categoriesRef = ref(database, 'categories');
        onValue(categoriesRef, (snapshot) => {
            const data = snapshot.val();
            const categoriesArray = data ? Object.values(data) : [];
            setAllCategories(categoriesArray);
            setFilteredCategories(categoriesArray); // Initialize filtered categories
        });
    }, []);

    // Filter categories based on search query
    useEffect(() => {
        setFilteredCategories(
            allCategories.filter(cat => 
                cat.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, allCategories]);

    const item_add_handler = async (event) => {
        event.preventDefault();

        const newItem = {
            category,
            name,
            details,
            reviews,
            rating,
            image,
        };

        try {
            await push(ref(database, `items/${category}`), newItem);
            navigate(`/item-types/${category}`);
        } catch (error) {
            console.error("Error adding item to Firebase:", error);
        }
    };

    const cancel = () => {
        navigate(`/item-types/${categorys}`);
    };

    const handleCategorySelect = (cat) => {
        setCategory(cat);      
        setSearchQuery(cat);     // Clear the search query to display only the selected category
        setDropdownOpen(false); // Close the dropdown
    };

    const handleSaveClick = (event) => {
        event.preventDefault();
        setShowConfirmation(true); 
    };
    const handleCancel = () => {
        setShowConfirmation(false); 
    };

    return (
        <div className={styles["form-container"]}>
            <h1>Add New Item</h1>
            <form onSubmit={handleSaveClick}>
                <div className={styles["form-group"]}>
                    <label htmlFor="category_name">Category Name:</label>
                        <div className={styles["custom-dropdown"]}>
                            <input type="text" placeholder="Select or search categories..." value={searchQuery}  // Display search query only
                            onChange={(e) => {
                                setSearchQuery(e.target.value); // Update search query with typed value
                                setDropdownOpen(true); // Open dropdown for search results
                            }}
                            onFocus={() => setDropdownOpen(true)}
                            />
                            {dropdownOpen && (
                            <div className={styles["dropdown-list"]}>
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map((cat) => (
                                        <div
                                            key={cat}
                                            className={styles["dropdown-item"]}
                                            onClick={() => handleCategorySelect(cat)}
                                        >
                                            {cat}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles["dropdown-item"]}>No categories found</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles["form-group"]}>
                    <label htmlFor="item_type">Item Name:</label>
                    <input type="text" id="item_type" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className={styles["form-group"]}>
                    <label htmlFor="item_details">Item Stock:</label>
                    <input type="" id="item_details" value={details} onChange={(e) => setDetails(e.target.value)}/>
                </div>

                <div className={styles["form-group"]}>
                    <label htmlFor="item_reviews">Reviews:</label>
                    <input type="text" id="item_reviews" value={reviews} onChange={(e) => setReviews(e.target.value)}/>
                </div>

                <div className={styles["form-group"]}>
                    <label htmlFor="item_rating">Rating:</label>
                    <input type="text" id="item_rating" value={rating} onChange={(e) => setRating(e.target.value)}/>
                </div>

                <div className={styles["form-group"]}>
                    <label htmlFor="item_image">Image URL:</label>
                    <input type="text" id="item_image" value={image} onChange={(e) => setImage(e.target.value)}/>
                </div>

                <button type="submit" className={styles["submit-button"]}>Add New Item</button>
                <button type="button" onClick={cancel} className={styles["cancel-button"]}>Cancel</button>
            </form>
             
            {showConfirmation && (
                <div>
                    <p>Would you like to add new item </p>
                    <button onClick={item_add_handler}>Yes</button>
                    <button onClick={handleCancel}>No</button>
                </div>
            )
            
            }

        </div>
    );
}

export default AddItemType;






// import { useState } from "react";
// import { useNavigate } from "react-router-dom";



// function Additemtype({ addItem }) {
// // function Additemtype({ dispatch }) {
//     const navigate = useNavigate();

//     const [category, setCategory] = useState("");
//     const [name, setName] = useState("");
//     const [details, setDetails] = useState("");
//     const [reviews, setReviews] = useState("");
//     const [rating, setRating] = useState("");
//     const [image, setImage] = useState("");

//     const item_add_handler = (event) => {
//         event.preventDefault();

//         const newItem = {
//             id: Math.random(), 
//             category,
//             name,
//             details,
//             Reviews: reviews,
//             Rating: rating,
//             Image_1: image,
//         };

        
//         // dispatch({ type: 'addItem', payload: newItem });
//         addItem(newItem);


//         navigate(`/item-types/${category}`);
//     };

//     return (
//         <div>
//             <h1>Add New Item</h1>
//             <form onSubmit={item_add_handler}>
//                 <div>
//                     <label htmlFor="category_name">Category Name:</label>
//                     <input type="text" id="category_name" value={category} onChange={(e) => setCategory(e.target.value)} />
//                 </div>

//                 <div>
//                     <label htmlFor="item_type">Item Name:</label>
//                     <input type="text" id="item_type" value={name} onChange={(e) => setName(e.target.value)} />
//                 </div>

//                 <div>
//                     <label htmlFor="item_details">Item Details:</label>
//                     <input type="text" id="item_details" value={details} onChange={(e) => setDetails(e.target.value)} />
//                 </div>

//                 <div>
//                     <label htmlFor="item_reviews">Reviews:</label>
//                     <input type="text" id="item_reviews" value={reviews} onChange={(e) => setReviews(e.target.value)} />
//                 </div>

//                 <div>
//                     <label htmlFor="item_rating">Rating:</label>
//                     <input type="text" id="item_rating" value={rating} onChange={(e) => setRating(e.target.value)} />
//                 </div>

//                 <div>
//                     <label htmlFor="item_image">Image URL:</label>
//                     <input type="text" id="item_image" value={image} onChange={(e) => setImage(e.target.value)} />
//                 </div>

//                 <button type="submit">Add New Item</button>
//             </form>
//         </div>
//     );
// }

// export default Additemtype;
