import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import styles from './Navbar.module.css'; // Assuming you have a CSS module for styling
import { FaHome, FaUser, FaUserCircle, FaSearch } from 'react-icons/fa'; // Import icons

const Navbar = ({ currentUser, searchTerm, setSearchTerm }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
      <span className={styles.homeLink}>
          <FaHome className={styles.icon} /> Home
        </span>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search for..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput} // Add your CSS class for styling
          />
          <FaSearch className={styles.searchIcon} /> {/* Search icon */}
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userPlaceholder}>
          <FaUser className={styles.icon} /> Welcome, Kim Hyan
        </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;