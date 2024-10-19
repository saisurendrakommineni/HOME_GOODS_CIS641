import { useState } from "react";
import {useNavigate } from "react-router-dom";
import styles from './ItemCategories.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
function Itemcategories({categories,handleDelete})
{
    const navigate=useNavigate()
    const handle_itemtypes_navigation=(category_name)=>{

       return navigate(`/item-types/${category_name}`)
    }
    const handle_addcategory=()=>{
        navigate("/add-item-categories")
    }

    // const[categories,setCategories]=useState(['Furniture','Decor','extra','something','done'])
    const[searchTerm,setsearchTerm]=useState('')
    const filteredCategories = categories.filter(category =>
        category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
return(
    <div>
        <div className={styles.search_item}>
        <h1>Item Categories Page</h1>
        <input type="text" placeholder="Search The Item" className={styles.searchBar} onChange={(event)=>{setsearchTerm(event.target.value)}}></input>
        <button onClick={handle_addcategory}>Add New Category</button>
        </div>

        <div className={styles.item_styles}>
            {filteredCategories.map((name,index) => (
            <div key={name}>
                {/* make sure to include key on high level like above div not below div */}
                
            <div className={styles.item}>
             <h1 onClick={()=>handle_itemtypes_navigation(name)}> {name} </h1>
            </div>

             <div>
             <FontAwesomeIcon icon={faTrash} className={styles.delete_icon} onClick={() => handleDelete(name)}/>
             </div>

             </div>
               
            ))}

        </div>
        
    </div>
)
}
export default Itemcategories;