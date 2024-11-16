import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function CreateAccount() {
    const navigate = useNavigate();
    const [Firstname, setFirstName] = useState('');
    const [Lastname, setLastName] = useState('');
    const [Email, setEmail] = useState({ value: '', isTouched: false });
    const [Password, setPassword] = useState({ value: "", isTouched: false });
    const [Repassword, setRepassword] = useState('');
    const [error, setError] = useState('');

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|mail\.gvsu\.edu)$/;
        return emailRegex.test(email);
    };

    const isPasswordStrong = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password.value);
        const hasNumber = /\d/.test(password.value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password.value);

        if (!password.isTouched) return null; // No message if not touched

        if (password.value.length < minLength) {
            return <p className="FieldError">Password should be at least {minLength} characters long</p>;
        }
        if (!hasUpperCase) {
            return <p className="FieldError">Password should contain at least one uppercase letter</p>;
        }
        if (!hasNumber) {
            return <p className="FieldError">Password should contain at least one number</p>;
        }
        if (!hasSpecialChar) {
            return <p className="FieldError">Password should contain at least one special character</p>;
        }
        return null;
    };

    const FormValid = () => {
        const minLength = 8;
        return (
            Firstname && 
            Lastname && 
            Email.value && 
            isValidEmail(Email.value) &&
            Password.value.length >= minLength && 
            Password.value === Repassword &&
            isPasswordStrong(Password) === null
        );
    };

    const handleCreateAccount = async (event) => {
        event.preventDefault();
        if (Password.value !== Repassword) {
            setError("Passwords do not match.");
            return;
        }
        if (!isValidEmail(Email.value)) {
            setError("Email must be a valid.");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, Email.value, Password.value);
            navigate("/account_success");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.App}>
            <form onSubmit={handleCreateAccount}>
                <div className={styles.style1}>
                    <div className={styles.input_group}>
                        <label htmlFor="first_name">First Name <sup>*</sup></label>
                        <input 
                            type="text" 
                            id="first_name" 
                            name="first_name1" 
                            placeholder='Enter First name' 
                            value={Firstname} 
                            onChange={(e) => { setFirstName(e.target.value); }} 
                        />
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="last_name">Last Name <sup>*</sup></label>
                        <input 
                            type="text" 
                            id="last_name" 
                            name="last_name1" 
                            placeholder='Enter Last name' 
                            value={Lastname} 
                            onChange={(e) => { setLastName(e.target.value); }} 
                        />
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="e_mail">E-mail <sup>*</sup></label>
                        <input 
                            type="email" 
                            id="e_mail" 
                            name="e_mail1" 
                            placeholder='Enter Email' 
                            value={Email.value} 
                            onChange={(e) => setEmail({ ...Email, value: e.target.value })} 
                            onBlur={() => setEmail({ ...Email, isTouched: true })}
                        />
                        {Email.isTouched && !isValidEmail(Email.value) && <p className="FieldError">Enter a correct email</p>}
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="password">Create Password <sup>*</sup> </label>
                        <input
                            type="password"
                            id="password"
                            name="password1"
                            placeholder='Enter Password'
                            value={Password.value}
                            onChange={(e) => setPassword({ ...Password, value: e.target.value })}
                            onBlur={() => setPassword({ ...Password, isTouched: true })}
                        />
                        {isPasswordStrong(Password)} 
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="repassword">Re - Enter Password <sup>*</sup></label>
                        <input
                            type="password"
                            id="repassword"
                            name="repassword1"
                            placeholder='Re - Enter Password'
                            value={Repassword}
                            onChange={(e) => setRepassword(e.target.value)}
                        />
                    </div>
                    {error && <div className={styles.error}>{error}</div>}
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