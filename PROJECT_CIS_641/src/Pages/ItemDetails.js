// import styles from './ItemCategories.module.css';
import { useParams } from "react-router-dom";
import {useNavigate } from "react-router-dom";


function Details({details_item})
{
    const navigate=useNavigate()
    const handle_details_page=()=>{
        navigate('/editdetails')
    }
    const{item}=useParams()
    const filter_items=details_item.filter(items=>items.name === item)
    return(
    <div>
        <div>
            <h1>Item Details {item}</h1>
        </div>
        <div>
            <button onClick={handle_details_page}>Edit Item Details</button>
        </div>
        <div>
            {filter_items.map((details )=>
            <div key={details.id} > 
                <p> Item Type: {details.name}</p>
                <p> Item Details: {details.details}</p>
                <p> Item Reviews: {details.Reviews}</p>
                {/* below details.image_1 && used because we want display image if only item has image */}
              
                 <p>{details.Rating}</p>
                 {details.Image_1 && <img src={details.Image_1} alt={`${details.name} `} />}
            </div>
        )}
        </div>
    </div>
    )
}
export default Details;