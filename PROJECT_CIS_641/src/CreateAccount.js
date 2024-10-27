import { useState } from 'react';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Import the auth object
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import the Firebase auth method

function CreateAccount() {
    const navigate = useNavigate();
    const [Firstname, setFirstName] = useState('');
    const [Lastname, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Repassword, setRepassword] = useState('');
    const [error, setError] = useState('');

    // Function to check password strength
    const isPasswordStrong = (password) => {
        const minLength = 6; // Example length
        return password.length >= minLength; // Add more complexity checks as needed
    };

    // Updated FormValid function to include password strength check
    const FormValid = () => {
        return (
            Firstname && Lastname && Email && isPasswordStrong(Password) && (Password === Repassword)
        );
    };

    const handleCreateAccount = async (event) => {
        event.preventDefault();
        if (Password !== Repassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, Email, Password);
            navigate("/account_success"); // Navigate to success page on successful registration
        } catch (error) {
            setError(error.message); // Capture any errors
        }
    };

    return (
        <div className={styles.App}>
            <form onSubmit={handleCreateAccount}>
                <div className={styles.style1}>
                    <div className={styles.input_group}>
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" id="first_name" name="first_name1" placeholder='Enter First name' value={Firstname} onChange={(e) => { setFirstName(e.target.value); }} />
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" id="last_name" name="last_name1" placeholder='Enter Last name' value={Lastname} onChange={(e) => { setLastName(e.target.value); }} />
                    </div>
                    <div className={styles.input_group}> 
                        <label htmlFor="e_mail">E-mail</label>
                        <input type="email" id="e_mail" name="e_mail1" placeholder='Enter Email' value={Email} onChange={(e) => { setEmail(e.target.value); }} />
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="password">Create Password </label>
                        <input type="password" id="password" name="password1" placeholder='Enter Password' value={Password} onChange={(e) => { setPassword(e.target.value); }} />
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="repassword">Re - Enter Password</label>
                        <input type="password" id="repassword" name="repassword1" placeholder='Re - Enter Password' value={Repassword} onChange={(e) => { setRepassword(e.target.value); }} />
                    </div>
                    {error && <div className={styles.error}>{error}</div>} {/* Show error message */}
                    <div className={styles.btn_style}>
                        <button type="submit" disabled={!FormValid()}>Create Account</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateAccount;






// import { useState } from 'react';
// import styles from './LoginPage.module.css';


// import { useNavigate } from 'react-router-dom';

// function CreateAccount()
// {
//     const navigate=useNavigate()
//     const handlesuccesspage=(event) =>
//     {
//      event.preventDefault(); 
//      navigate("/account_success")   
//     }
//     const[Firstname,setFirstName]=useState('')
//     const[Lastname,setLastName]=useState('')
//     const[Email,setEmail]=useState('')
//     const[Password,setPassword]=useState('')
//     const[Repassword,setRepassword]=useState('')

//     const FormValid=()=>{
//         return(
//             Firstname && Lastname && Email && Password && Repassword
//         )
//     }

//     return(
        
//         <div className={styles.App}>
//             <form onSubmit={handlesuccesspage}>
//                 <div className={styles.style1}>
//                     <div className={styles.input_group}>
//                         <label htmlFor="first_name">First Name</label>
//                         <input type="text" id="first_name" name="first_name1" placeholder='Enter First name' value={Firstname} onChange={(e)=>{setFirstName(e.target.value)}}></input>
//                     </div>
//                     <div className={styles.input_group}>
//                         <label htmlFor="last_name">Last Name</label>
//                         <input type="text" id="last_name" name="last_name1" placeholder='Enter Second name' value={Lastname} onChange={(e)=>{setLastName(e.target.value)}}></input>
//                     </div>
//                     <div className={styles.input_group}> 
//                         <label htmlFor="e_mail">E-mail</label>
//                         <input type="text" id="e_mail" name="e_mail1" placeholder='Enter Email' value={Email} onChange={(e)=>{setEmail(e.target.value)}}></input>
//                     </div>
//                     <div className={styles.input_group}>
//                         <label htmlFor="password">Create Password </label>
//                         <input type="password" id="password" name="password1" placeholder='Enter Password' value={Password} onChange={(e)=>{setPassword(e.target.value)}}></input>
//                     </div>
//                     <div className={styles.input_group}>
//                         <label htmlFor="repassword">Re - Enter Password</label>
//                         <input type="password" id="repassword" name="repassword1" placeholder='Re - Enter Password' value={Repassword} onChange={(e)=>{setRepassword(e.target.value)}}></input>
//                     </div>
//                     <div className={styles.btn_style}>
//                         <button type="submit" disabled={!FormValid()}>Create Account</button>
//                     </div>
                   
//                     </div>
//             </form>
//         </div>
//     )
// }
// export default CreateAccount;