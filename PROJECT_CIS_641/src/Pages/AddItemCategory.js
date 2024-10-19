import { useState } from "react"
import {useNavigate } from "react-router-dom";

function Addcategory({addCategory})
{
    const navigate=useNavigate()
    const[newcategory,setnewcategory]=useState("")
    const formvalidate=()=>{
        return(
            newcategory
        )
    }
    const handle_add_category=(event)=>{
        event.preventDefault(); 
        addCategory(newcategory); 
        navigate('/item-categories')
      }
    return(
    <div>
        <div>
        <h1>Add Item Category</h1>
        </div>
        <form onSubmit={handle_add_category}>
        <div>
           <label htmlFor="Cat_name">Enter Category Name</label>
            <input type="text" placeholder="Enter Category Name" id="Cat_name" name="new_category" value={newcategory} onChange={(e)=>{setnewcategory(e.target.value)}}></input>
        </div>
        <div>
            <button disabled={!formvalidate()}>Save </button>
        </div>
        </form>
    </div>
    )
}
export default Addcategory