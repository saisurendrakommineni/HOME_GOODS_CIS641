import React from 'react';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';

function Success()
{
    const navigate=useNavigate()
    const navigateback=(event) =>
    {
     event.preventDefault(); 
     navigate('/')   
    }
    return(
    <div className={styles.style1}>
        <h1>Congrats!! Account Created Successfully</h1>
        <div className={styles.btn_style}>
        <button onClick={navigateback}>Back to Account</button>
    </div>
    </div>
    )
}
export default Success;