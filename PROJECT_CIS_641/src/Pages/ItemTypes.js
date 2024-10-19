import { useState } from 'react';
import styles from './ItemCategories.module.css';
import {useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { useParams } from "react-router-dom";
function Itemtypes({items})
{
    const navigate = useNavigate()
    const navigate_add_item=()=>{
        // console.log('Navigating to /add-item-type');
        navigate("/add-item-type")
    }
    const {category}=useParams(); /// category comes from the route definition(APP.JS) ":category"
    const filteredItems1=items.filter((item)=>item.category === category)
    const[filteredItems,setfilteredItems]=useState(filteredItems1)
    
    
    // console.log(filteredItems)
    const[itemsearch,setitemsearch]=useState('')
    const filter_search=filteredItems.filter(item =>item.name.toLowerCase().includes(itemsearch.toLowerCase()))
    const handle_Delete_item=(item_name)=>{
        const updated=filteredItems.filter(name_delete => name_delete.name !== item_name)
        // console.log(updated)
        setfilteredItems(updated)
  }
   const handle_details_page=(item_name)=>{
    navigate(`/details/${item_name}`)
   }
    return(
    <div>
        <div className={styles.search_item}>

            <h1>Items in {category}</h1>
            <input type="text" placeholder='Search the item' className={styles.searchBar} onChange={(e)=>setitemsearch(e.target.value)}></input>
            <button onClick={navigate_add_item}>Add New Item</button>
        </div>
        
        <div className={styles.item_styles}>
          {filter_search.map((item) => (
                <div key={item.id}>
                    <div   className={styles.item} onClick={()=>handle_details_page(item.name)}>
                    
                        <strong>{item.name}</strong> 
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faTrash} className={styles.delete_icon} onClick={() => handle_Delete_item(item.name)}/>
                    </div>
                </div>
                    
                ))}
          
        </div>

       
    </div>
    )

}
export default Itemtypes;