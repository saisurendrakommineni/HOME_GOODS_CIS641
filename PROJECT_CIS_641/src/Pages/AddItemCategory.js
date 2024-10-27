import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from '../firebase'; // Import Firebase instance
import { ref, push } from 'firebase/database';

function Addcategory() {
    const navigate = useNavigate();
    const [newCategory, setNewCategory] = useState("");

    const formValidate = () => {
        return newCategory.trim().length > 0;
    };

    const handleAddCategory = async (event) => {
        event.preventDefault();

        // Add new category to Firebase
        const categoriesRef = ref(database, 'categories');
        await push(categoriesRef, newCategory);

        navigate('/item-categories');
    };

    return (
        <div>
            <div>
                <h1>Add Item Category</h1>
            </div>
            <form onSubmit={handleAddCategory}>
                <div>
                    <label htmlFor="Cat_name">Enter Category Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter Category Name" 
                        id="Cat_name" 
                        name="new_category" 
                        value={newCategory} 
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                </div>
                <div>
                    <button disabled={!formValidate()}>Save</button>
                </div>
            </form>
        </div>
    );
}

export default Addcategory;



// import { useState } from "react"
// import {useNavigate } from "react-router-dom";

// function Addcategory({addCategory})
// {
//     const navigate=useNavigate()
//     const[newcategory,setnewcategory]=useState("")
//     const formvalidate=()=>{
//         return(
//             newcategory
//         )
//     }
//     const handle_add_category=(event)=>{
//         event.preventDefault(); 
//         addCategory(newcategory); 
//         navigate('/item-categories')
//       }
//     return(
//     <div>
//         <div>
//         <h1>Add Item Category</h1>
//         </div>
//         <form onSubmit={handle_add_category}>
//         <div>
//            <label htmlFor="Cat_name">Enter Category Name</label>
//             <input type="text" placeholder="Enter Category Name" id="Cat_name" name="new_category" value={newcategory} onChange={(e)=>{setnewcategory(e.target.value)}}></input>
//         </div>
//         <div>
//             <button disabled={!formvalidate()}>Save </button>
//         </div>
//         </form>
//     </div>
//     )
// }
// export default Addcategory