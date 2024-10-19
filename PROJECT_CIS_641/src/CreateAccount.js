import { useState } from 'react';
import styles from './LoginPage.module.css';


import { useNavigate } from 'react-router-dom';

function CreateAccount()
{
    const navigate=useNavigate()
    const handlesuccesspage=(event) =>
    {
     event.preventDefault(); 
     navigate("/account_success")   
    }
    const[Firstname,setFirstName]=useState('')
    const[Lastname,setLastName]=useState('')
    const[Email,setEmail]=useState('')
    const[Password,setPassword]=useState('')
    const[Repassword,setRepassword]=useState('')

    const FormValid=()=>{
        return(
            Firstname && Lastname && Email && Password && Repassword
        )
    }

    return(
        
        <div className={styles.App}>
            <form onSubmit={handlesuccesspage}>
                <div className={styles.style1}>
                    <div className={styles.input_group}>
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" id="first_name" name="first_name1" placeholder='Enter First name' value={Firstname} onChange={(e)=>{setFirstName(e.target.value)}}></input>
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" id="last_name" name="last_name1" placeholder='Enter Second name' value={Lastname} onChange={(e)=>{setLastName(e.target.value)}}></input>
                    </div>
                    <div className={styles.input_group}> 
                        <label htmlFor="e_mail">E-mail</label>
                        <input type="text" id="e_mail" name="e_mail1" placeholder='Enter Email' value={Email} onChange={(e)=>{setEmail(e.target.value)}}></input>
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="password">Create Password </label>
                        <input type="password" id="password" name="password1" placeholder='Enter Password' value={Password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="repassword">Re - Enter Password</label>
                        <input type="password" id="repassword" name="repassword1" placeholder='Re - Enter Password' value={Repassword} onChange={(e)=>{setRepassword(e.target.value)}}></input>
                    </div>
                    <div className={styles.btn_style}>
                        <button type="submit" disabled={!FormValid()}>Create Account</button>
                    </div>
                   
                    </div>
            </form>
        </div>
    )
}
export default CreateAccount;