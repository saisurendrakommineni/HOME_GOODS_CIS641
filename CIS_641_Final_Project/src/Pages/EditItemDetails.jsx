import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { database } from "../firebase";
import { ref, get, update } from "firebase/database";
import styles from './AddItemType.module.css'; // Reusing the same style file for consistency

function EditItemDetails() {
    const { category, itemId } = useParams();
    const [details, setDetails] = useState({
        name: "",
        details: "",
        reviews: "",
        rating: "",
        image: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const itemRef = ref(database, `items/${category}/${itemId}`);
                const snapshot = await get(itemRef);
                if (snapshot.exists()) {
                    setDetails(snapshot.val());
                } else {
                    setError("Item not found.");
                }
            } catch (error) {
                setError("Failed to load item details.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category, itemId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            const itemRef = ref(database, `items/${category}/${itemId}`);
            await update(itemRef, details);
            navigate(`/item-types/${category}`);
        } catch (error) {
            setError("Failed to save changes.");
        }
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    if (loading) return <p>Loading item details...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className={styles["form-container"]}>
            <h1>Edit Item Details</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles["form-group"]}>
                    <label htmlFor="name">Item Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={details.name}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={styles["form-group"]}>
                    <label htmlFor="details">Item Stock:</label>
                    <input
                        type="number"
                        id="details"
                        name="details"
                        value={details.details}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={styles["form-group"]}>
                    <label htmlFor="reviews">Reviews:</label>
                    <input
                        type="text"
                        id="reviews"
                        name="reviews"
                        value={details.reviews}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={styles["form-group"]}>
                    <label htmlFor="rating">Rating:</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={details.rating}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={styles["form-group"]}>
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={details.image}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className={styles["submit-button"]}>
                    Save Changes
                </button>
                <button
                    type="button"
                    onClick={() => navigate(`/item-types/${category}`)}
                    className={styles["cancel-button"]}
                >
                    Cancel
                </button>
            </form>

            {showConfirmation && (
                <div className={styles["confirmation-modal"]}>
                    <p>Are you sure you want to save these changes?</p>
                    <button
                        onClick={handleSaveChanges}
                       
                    >
                        Yes
                    </button>
                    <button
                        onClick={handleCancel}
                       
                    >
                        No
                    </button>
                </div>
            )}
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
