import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditDetails({ item_details, dispatch }) {
//    console.log(item_details[0])
    const { itm } = useParams(); 
    const navigate = useNavigate();

    const itemToEdit = item_details.find(i => i.name === itm);
        // console.log(itemToEdit)

    const [name, setName] = useState(itemToEdit.name);
    const [details, setDetails] = useState(itemToEdit.details);
    const [reviews, setReviews] = useState(itemToEdit.Reviews);
    const [rating, setRating] = useState(itemToEdit.Rating);
    const [image, setImage] = useState(itemToEdit.Image_1);

    const handle_changes = (event) => {
        event.preventDefault();

        const UpdatedItem = {
            ...itemToEdit, 
            name,
            details,
            Reviews: reviews,
            Rating: rating,
            Image_1: image
        };

        
        dispatch({ type: 'editItem', payload: UpdatedItem });
        navigate(`/item-types/${itemToEdit.category}`);
    };

    return (
        <div>
            <div>
                <h1>Edit Item Details</h1>
            </div>

            <form onSubmit={handle_changes}>
                <div>
                    <label htmlFor="item_type">Item Name:</label>
                    <input
                        type="text"
                        id="item_type"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="item_details">Item Details:</label>
                    <input
                        type="text"
                        id="item_details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="item_reviews">Reviews:</label>
                    <input
                        type="number"
                        id="item_reviews"
                        value={reviews}
                        onChange={(e) => setReviews(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="item_rating">Rating:</label>
                    <input
                        type="number"
                        step="0.1"
                        id="item_rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="item_image">Image URL:</label>
                    <input
                        type="text"
                        id="item_image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>

                <button type="submit">Edit Item</button>
            </form>
        </div>
    );
}

export default EditDetails;
