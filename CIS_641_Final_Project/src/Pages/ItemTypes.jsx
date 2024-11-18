import React, { useState, useEffect } from 'react';
import styles from './Itemtypes.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { database } from '../firebase'; // Import Firebase instance
import { ref, onValue, remove } from 'firebase/database';

function Itemtypes() {
    const navigate = useNavigate();
    const { category } = useParams(); // `category` comes from the route definition in App.js
    const [filteredItems, setFilteredItems] = useState([]);
    const [itemSearch, setItemSearch] = useState('');

    // Fetch items from Firebase on component mount
    useEffect(() => {
        const itemsRef = ref(database, `items/${category}`);
        onValue(itemsRef, (snapshot) => {
            const itemsData = snapshot.val();
            const itemsArray = itemsData ? Object.keys(itemsData).map(id => ({ id, ...itemsData[id] })) : [];
            setFilteredItems(itemsArray);
        });
    }, [category]);

    const navigateAddItem = () => {
        navigate(`/add-item-type/${category}`);
    };

    const handleBack = () => {
        navigate('/item-categories');
    };

    const handleDeleteItem = async (itemId) => {
        const confirmed = window.confirm('Are you sure you want to delete this item?');
        if (confirmed) {
            const itemRef = ref(database, `items/${category}/${itemId}`);
            await remove(itemRef);
        }
    };

    const handleDetailsPage = (itemName) => {
        console.log(`Navigating to details for category: ${category}, item: ${itemName}`);
        navigate(`/details/${category}/${itemName}`);
    };

    // Filter items based on search input
    const filteredSearch = filteredItems.filter(item =>
        item.name.toLowerCase().includes(itemSearch.toLowerCase())
    );

    return (
        <div>
            <div className={styles.search_item}>
                <button onClick={handleBack}>Back</button>
                <h1>Items in {category}</h1>
                <input 
                    type="text" 
                    placeholder="Search the item" 
                    className={styles.searchBar} 
                    onChange={(e) => setItemSearch(e.target.value)}
                />
                <button onClick={navigateAddItem}>Add New Item</button>
            </div>

            <div className={styles.item_styles}>
                {filteredSearch.map((item) => (
                    <div key={item.id} className={styles.item_container}>
                        <div className={styles.item} onClick={() => handleDetailsPage(item.name)}>
                            <strong>{item.name}</strong>
                        </div>
                        <div className={styles.delete_icon_container}>
                            <FontAwesomeIcon 
                                icon={faTrash} 
                                className={styles.delete_icon} 
                                onClick={() => handleDeleteItem(item.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Itemtypes;




// import { useState } from 'react';
// import styles from './ItemCategories.module.css';
// import {useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';

// import { useParams } from "react-router-dom";
// function Itemtypes({items})
// {
//     const navigate = useNavigate()
//     const navigate_add_item=()=>{
//         // console.log('Navigating to /add-item-type');
//         navigate("/add-item-type")
//     }
//     const {category}=useParams(); /// category comes from the route definition(APP.JS) ":category"
//     const filteredItems1=items.filter((item)=>item.category === category)
//     const[filteredItems,setfilteredItems]=useState(filteredItems1)
    
    
//     // console.log(filteredItems)
//     const[itemsearch,setitemsearch]=useState('')
//     const filter_search=filteredItems.filter(item =>item.name.toLowerCase().includes(itemsearch.toLowerCase()))
//     const handle_Delete_item=(item_name)=>{
//         const updated=filteredItems.filter(name_delete => name_delete.name !== item_name)
//         // console.log(updated)
//         setfilteredItems(updated)
//   }
//    const handle_details_page=(item_name)=>{
//     navigate(`/details/${item_name}`)
//    }
//     return(
//     <div>
//         <div className={styles.search_item}>

//             <h1>Items in {category}</h1>
//             <input type="text" placeholder='Search the item' className={styles.searchBar} onChange={(e)=>setitemsearch(e.target.value)}></input>
//             <button onClick={navigate_add_item}>Add New Item</button>
//         </div>
        
//         <div className={styles.item_styles}>
//           {filter_search.map((item) => (
//                 <div key={item.id}>
//                     <div   className={styles.item} onClick={()=>handle_details_page(item.name)}>
                    
//                         <strong>{item.name}</strong> 
//                     </div>
//                     <div>
//                         <FontAwesomeIcon icon={faTrash} className={styles.delete_icon} onClick={() => handle_Delete_item(item.name)}/>
//                     </div>
//                 </div>
                    
//                 ))}
          
//         </div>

       
//     </div>
//     )

// }
// export default Itemtypes;