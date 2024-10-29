import React, { useState } from 'react';
import styles from './Password.module.css'; // Assuming CSS is scoped via modules
import { useNavigate } from 'react-router-dom';

import axios from 'axios'; // For making HTTP requests

const Email = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!email) {
            setError('Email is required');
            return;
        }

        try {
            // Call the API to send the reset password email
            const response = await axios.post('http://localhost:5239/api/accounts/forgotpassword', { email });
            setSuccessMessage(response.data.message);

            // Optionally redirect after a few seconds
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after success
            }, 3000);
        } catch (error) {
            setError('Failed to send the reset password email. Please try again.');
        }
    };

    return (
        <div className={styles.forgotPasswordContainer}>
        <div className={styles.leftSide}>
            <div className={styles.logo}>
                <div className={styles.logoSquare}></div>
                <span className={styles.boldText}>SalarySync</span>
            </div>
            {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}
            <form onSubmit={handleForgotPassword}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                        type="email"
                        className={styles.inputField}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit" className={styles.resetButton}>Send Reset Link</button>
            </form>
        </div>
            <div className={styles.rightSide}>
                <div className={styles.iconGrid}>
				<img src="https://res.cloudinary.com/drgxphf5l/image/upload/v1726736758/qwbddlqxjjgxsvbdcudg.png" className='image' />
                 
                </div>
            </div>
        </div>
    );
};

export default Email;