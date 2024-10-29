import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeDetailsCSS from "./EmployeeDetails.module.css";
import { FaPen } from "react-icons/fa"; // Import pen icon from react-icons

const BankingDetail = ({ onSuccess }) => {
  const [bankingDetails, setBankingDetails] = useState(null); // Initialize as null to check if data is loaded
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [error, setError] = useState("");
  const [isEditable, setIsEditable] = useState(false); // State to toggle edit mode

  // Retrieve user ID from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user?.userID;

  // Fetch banking details for the logged-in user
  useEffect(() => {
    const fetchBankingDetails = async () => {
      try {
        if (userID) {
          const response = await axios.get(`http://localhost:5239/api/BankingDetail/${userID}`);
          
          // Assuming response.data returns a single object for the user's banking details
          if (response.data && response.data.length > 0) {
            const details = response.data[0]; // Get the first item if it's an array
            setBankingDetails(details);
            setBankName(details.bankName);
            setAccountNumber(details.accountNumber);
            setAccountType(details.accountType);
            setBranchCode(details.branchCode);
          } else {
            setError("No banking details found for the current user.");
          }
        } else {
          alert("No user ID found in local storage.");
        }
      } catch (err) {
        setError(err.response?.data || "An error occurred while fetching banking details.");
      }
    };

    fetchBankingDetails();
  }, [userID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5239/api/BankingDetail", {
        appUserId: userID,
        bankName,
        accountNumber,
        accountType,
        branchCode,
      });
      onSuccess(response.data);
      // Update banking details after submission
      setBankingDetails((prev) => ({
        ...prev,
        bankName,
        accountNumber,
        accountType,
        branchCode,
      }));
      setIsEditable(false); // Exit edit mode after saving
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred while saving banking details.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}
        <h3>Your Banking Details</h3>
        <div className={EmployeeDetailsCSS.row}>
          <div className={EmployeeDetailsCSS.inputGroup}>
            <p>
              <strong>Bank Name:</strong>
              <FaPen
                onClick={() => setIsEditable(true)}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            </p>
            <input
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className={EmployeeDetailsCSS.inputField}
              required
              readOnly={!isEditable}
            />
          </div>

          <div className={EmployeeDetailsCSS.inputGroup}>
            <p>
              <strong>Account Number:</strong>
              <FaPen
                onClick={() => setIsEditable(true)}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            </p>
            <input
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className={EmployeeDetailsCSS.inputField}
              required
              readOnly={!isEditable}
            />
          </div>
        </div>

        <div className={EmployeeDetailsCSS.row}>
          <div className={EmployeeDetailsCSS.inputGroup}>
            <p>
              <strong>Account Type:</strong>
              <FaPen
                onClick={() => setIsEditable(true)}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            </p>
            <input
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className={EmployeeDetailsCSS.inputField}
              required
              readOnly={!isEditable}
            />
          </div>

          <div className={EmployeeDetailsCSS.inputGroup}>
            <p>
              <strong>Branch Code:</strong>
              <FaPen
                onClick={() => setIsEditable(true)}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            </p>
            <input
              value={branchCode}
              onChange={(e) => setBranchCode(e.target.value)}
              className={EmployeeDetailsCSS.inputField}
              required
              readOnly={!isEditable}
            />
          </div>
        </div>

        {isEditable && <button type="submit">Submit Banking Details</button>}
      </form>

      {bankingDetails === null && <div>Loading banking details...</div>}
      {bankingDetails && bankingDetails.length === 0 && <div>No banking details available for the current user.</div>}
    </div>
  );
};

export default BankingDetail;
