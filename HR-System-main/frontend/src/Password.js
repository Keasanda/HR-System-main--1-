import React, { useState } from 'react';
import styles from './Password.module.css'; // Assuming CSS is scoped via modules
import { useNavigate } from 'react-router-dom';

const Password = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!newPassword) newErrors.newPassword = "New password is required";
        if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required";
        if (newPassword !== confirmPassword) newErrors.passwordMismatch = "Passwords do not match";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Simulate password reset logic (You can replace this with an actual API call)
            setSuccessMessage("Password reset successful!");
            setNewPassword('');
            setConfirmPassword('');
            setErrors({});

            // Redirect or handle further logic after password reset
            setTimeout(() => {
                navigate('/'); // Redirect to login page after success
            }, 2000);
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
                <form onSubmit={handleResetPassword}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>New Password</label>
                        {errors.newPassword && <p className={styles.errorMessage}>{errors.newPassword}</p>}
                        <input
                            type="password"
                            className={styles.inputField}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Confirm New Password</label>
                        {errors.confirmPassword && <p className={styles.errorMessage}>{errors.confirmPassword}</p>}
                        {errors.passwordMismatch && <p className={styles.errorMessage}>{errors.passwordMismatch}</p>}
                        <input
                            type="password"
                            className={styles.inputField}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className={styles.resetButton}>Submit</button>
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

export default Password;