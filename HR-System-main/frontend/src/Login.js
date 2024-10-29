import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  // Form validation to ensure both fields are filled
  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:5239/api/accounts/login", {
          email,
          password,
          remember: true,
        });
  
        if (response.status === 200) {
          const { userEmail, userID, roles, roleName } = response.data;
  
          // Save user data to local storage
          localStorage.setItem("user", JSON.stringify({ userEmail, userID, roles }));
          setSuccessMessage("Login successful!");
  
          // Redirect based on role
          if (roleName === "Admin") {
            navigate("/admin-dashboard");
          } else if (roleName === "Employee") {
            navigate("/home");
          } else if (roleName === "Executive") {
            navigate("/executive-dashboard");
          } else {
            navigate("/default-page"); // fallback for roles without specific pages
          }
        }
      } catch (error) {
        if (error.response) {
          setServerError(error.response.data.message);
        } else {
          setServerError("An error occurred. Please try again.");
        }
      }
    }
  };
  

  return (
    <div className={styles.loginContainer}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <div className={styles.logoSquare}></div>
          <span className={styles.boldText}>SalarySync</span>
        </div>
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        {serverError && <p className={styles.errorMessage}>{serverError}</p>}
        <form onSubmit={handleLogin}>
          <div className={styles.Group}>
            <label className={styles.label}>Email</label>
            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
            <input
              type="email"
              className={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.Group}>
            <label className={styles.label}>Password</label>
            {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
            <input
              type="password"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.forgotPasswordAndButton}>
            <Link to="/email" className={styles.forgotPassword}>
              Forgot Password?
            </Link>
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </div>
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

export default Login;
