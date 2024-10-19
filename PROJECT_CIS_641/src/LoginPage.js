import { useState } from 'react';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const handleCreateAccountClick = (event) => {
    event.preventDefault(); 
    navigate('/create-account');
    };
    const handleitemcategories=(event)=>{
      event.preventDefault(); 
      navigate('/item-categories')
    }
    const[Username,setUsername]=useState('')
    const[Password,setPassword]=useState('')

    const Formvalid=()=>{
      return(
        Username && Password
      )

    }

  return (
    <div className={styles.App}>
      <form onSubmit={handleitemcategories}>
      <div className={styles.style1}>
      <div className={styles.input_group}>
        <label htmlFor="user_name">Username</label>
        <input type="text" id="user_name" name="user_name1" placeholder='Enter User Name' value={Username} onChange={(e)=>{setUsername(e.target.value)}} ></input>
      </div>
      <div className={styles.input_group}> 
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password_1" placeholder='Enter Password' value={Password} onChange={(e)=>{setPassword(e.target.value)} }></input>
      </div>
      <div className={styles.btn_style}>
        <button type="submit"  disabled={!Formvalid()}>Login</button>
      </div>
      <div className={styles.btn_style}>
        <button onClick={handleCreateAccountClick}>Create Account</button>
      </div>
      </div>
      </form>

    </div>
  
  );
}
export default Login;


