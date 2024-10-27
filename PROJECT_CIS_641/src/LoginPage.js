import { useState } from 'react';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Import the auth object
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import the Firebase auth method

function Login() {
    const navigate = useNavigate();
    const handleCreateAccountClick = (event) => {
        event.preventDefault(); 
        navigate('/create-account');
    };
    
    const handleitemcategories = (event) => {
        event.preventDefault(); 
        navigate('/item-categories');
    };

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState('');

    const Formvalid = () => {
        return Username && Password;
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, Username, Password);
            handleitemcategories(event); // Navigate to item categories on successful login
        } catch (error) {
            setError(error.message); // Capture any errors
        }
    };

    return (
        <div className={styles.App}>
            <form onSubmit={handleLogin}>
                <div className={styles.style1}>
                    <div className={styles.input_group}>
                        <label htmlFor="user_name">Username</label>
                        <input 
                            type="email" 
                            id="user_name" 
                            name="user_name1" 
                            placeholder='Enter User Name' 
                            value={Username} 
                            onChange={(e) => { setUsername(e.target.value); }} 
                        />
                    </div>
                    <div className={styles.input_group}> 
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password_1" 
                            placeholder='Enter Password' 
                            value={Password} 
                            onChange={(e) => { setPassword(e.target.value); }} 
                        />
                    </div>
                    {error && <div className={styles.error}>{error}</div>} {/* Show error message */}
                    <div className={styles.btn_style}>
                        <button type="submit" disabled={!Formvalid()}>Login</button>
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





// import { useState } from 'react';
// import styles from './LoginPage.module.css';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//     const navigate = useNavigate();
//     const handleCreateAccountClick = (event) => {
//     event.preventDefault(); 
//     navigate('/create-account');
//     };
//     const handleitemcategories=(event)=>{
//       event.preventDefault(); 
//       navigate('/item-categories')
//     }
//     const[Username,setUsername]=useState('')
//     const[Password,setPassword]=useState('')

//     const Formvalid=()=>{
//       return(
//         Username && Password
//       )

//     }

//   return (
//     <div className={styles.App}>
//       <form onSubmit={handleitemcategories}>
//       <div className={styles.style1}>
//       <div className={styles.input_group}>
//         <label htmlFor="user_name">Username</label>
//         <input type="text" id="user_name" name="user_name1" placeholder='Enter User Name' value={Username} onChange={(e)=>{setUsername(e.target.value)}} ></input>
//       </div>
//       <div className={styles.input_group}> 
//         <label htmlFor="password">Password</label>
//         <input type="password" id="password" name="password_1" placeholder='Enter Password' value={Password} onChange={(e)=>{setPassword(e.target.value)} }></input>
//       </div>
//       <div className={styles.btn_style}>
//         <button type="submit"  disabled={!Formvalid()}>Login</button>
//       </div>
//       <div className={styles.btn_style}>
//         <button onClick={handleCreateAccountClick}>Create Account</button>
//       </div>
//       </div>
//       </form>

//     </div>
  
//   );
// }
// export default Login;


