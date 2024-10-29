import React, { useState } from "react";
import axios from "axios";
import styles from "./PasswordResetRequest.module.css"; // Assuming you use CSS modules like the AddEmployee component

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5239/api/requestpasswordreset", { email });
      setMessage("Password reset link sent to your email.");
    } catch (error) {
      setMessage("Error sending password reset link. Please try again.");
      console.error("Error sending password reset link:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Reset Password</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Enter your email address:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>
        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default PasswordResetRequest;