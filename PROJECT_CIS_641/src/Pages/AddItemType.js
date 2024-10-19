import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Additemtype({ dispatch }) {
    const navigate = useNavigate();

    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [reviews, setReviews] = useState("");
    const [rating, setRating] = useState("");
    const [image, setImage] = useState("");

    const item_add_handler = (event) => {
        event.preventDefault();

        const newItem = {
            id: Math.random(), 
            category,
            name,
            details,
            Reviews: reviews,
            Rating: rating,
            Image_1: image,
        };

        
        dispatch({ type: 'addItem', payload: newItem });

        navigate(`/item-types/${category}`);
    };

    return (
        <div>
            <h1>Add New Item</h1>
            <form onSubmit={item_add_handler}>
                <div>
                    <label htmlFor="category_name">Category Name:</label>
                    <input type="text" id="category_name" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="item_type">Item Name:</label>
                    <input type="text" id="item_type" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="item_details">Item Details:</label>
                    <input type="text" id="item_details" value={details} onChange={(e) => setDetails(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="item_reviews">Reviews:</label>
                    <input type="text" id="item_reviews" value={reviews} onChange={(e) => setReviews(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="item_rating">Rating:</label>
                    <input type="text" id="item_rating" value={rating} onChange={(e) => setRating(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="item_image">Image URL:</label>
                    <input type="text" id="item_image" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>

                <button type="submit">Add New Item</button>
            </form>
        </div>
    );
}

export default Additemtype;
