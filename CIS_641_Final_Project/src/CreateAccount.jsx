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

    // Email validation regex for Gmail and GVSU emails
    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|mail\.gvsu\.edu)$/;
        return emailRegex.test(email);
    };

    // Password strength validation
    const isPasswordStrong = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return `Password should be at least ${minLength} characters long`;
        }
        if (!hasUpperCase) {
            return "Password should contain at least one uppercase letter";
        }
        if (!hasNumber) {
            return "Password should contain at least one number";
        }
        if (!hasSpecialChar) {
            return "Password should contain at least one special character";
        }
        return null;
    };

    // Check if form is valid
    const FormValid = () => {
        return (
            Firstname && 
            Lastname && 
            Email.value && 
            isValidEmail(Email.value) &&
            Password.value.length >= 8 && 
            Password.value === Repassword &&
            !isPasswordStrong(Password.value)
        );
    };

    // Handle form submission
    const handleCreateAccount = async (event) => {
        event.preventDefault();
        if (Password.value !== Repassword) {
            setError("Passwords do not match.");
            return;
        }
        if (!isValidEmail(Email.value)) {
            setError("Email must be valid.");
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
                    {/* First Name Field */}
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

                    {/* Last Name Field */}
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

                    {/* Email Field */}
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
                        {Email.isTouched && !isValidEmail(Email.value) && (
                            <p className="FieldError">Enter a correct email (must be Gmail or GVSU email)</p>
                        )}
                    </div>

                    {/* Password Field */}
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
                        {Password.isTouched && isPasswordStrong(Password.value) && (
                            <p className="FieldError">{isPasswordStrong(Password.value)}</p>
                        )}
                    </div>

                    {/* Re-enter Password Field */}
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
                        {Repassword && Password.value !== Repassword && (
                            <p className="FieldError">Passwords do not match</p>
                        )}
                    </div>

                    {/* Display Form Errors */}
                    {error && <div className={styles.error}>{error}</div>}

                    {/* Submit Button */}
                    <div className={styles.btn_style}>
                        <button type="submit" disabled={!FormValid()}>Create Account</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateAccount;
