// import styles from './ItemCategories.module.css';
import { useParams } from "react-router-dom";
import {useNavigate } from "react-router-dom";


function Details({details_item})
{
    const navigate=useNavigate()
    const handle_details_page=(item_name)=>{
        navigate(`/editdetails/${item_name}`)
    }
    const{item}=useParams()
    const filter_items=details_item.filter(items=>items.name === item)
    // console.log(filter_items[0].name)
    return(
    <div>
        <div>
            <h1>Item Details {item}</h1>
            {/* <h1>category name :{filter_items[0].category}</h1> */}
        </div>
       
       <div>
            {filter_items.map((details )=>
            
         <div key={details.id}>

            <div>
            <button onClick={()=>handle_details_page(details.name)}>Edit Item Details</button>
        </div> 

            <div> 


                
                <p> Item Category: {details.category}</p>
                <p> Item name: {details.name}</p>
                <p> Item Details: {details.details}</p>
                <p> Item Reviews: {details.Reviews}</p>
                {/* below details.image_1 && used because we want display image if only item has image */}
              
                 <p>{details.Rating}</p>
                 {details.Image_1 && <img src={details.Image_1} alt={`${details.name} `} />}
            </div>
        </div>
        )}
        </div>
    </div>
    )
}
export default Details;