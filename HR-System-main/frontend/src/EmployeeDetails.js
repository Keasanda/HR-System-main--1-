import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Ensure useNavigate is imported
import axios from "axios";
import EmployeeDetailsCSS from "./EmployeeDetails.module.css";
import Sidebar from "./Sidebar";
import BankingDetail from "./BankingDetail";
import Qualifications from "./Qualifications";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        console.log(`Fetching employee details for ID: ${id}`);
        const response = await axios.get(`http://localhost:5239/api/employee/${id}`);
        console.log("Response:", response.data);
        setEmployee(response.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "An error occurred while fetching employee details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  // Check if the logged-in user can view the employee details
  useEffect(() => {
    if (employee) {
      // Retrieve and parse user data from local storage
      const userData = JSON.parse(localStorage.getItem("user"));
      const userEmail = userData ? userData.userEmail : null; // Get userEmail from parsed object

      console.log("User Email from localStorage:", userEmail);
      console.log("Employee Email:", employee.email);

      // Compare emails
      if (userEmail && userEmail.trim() !== employee.email.trim()) {
        console.log("Email mismatch. Redirecting to home page.");
        navigate("/home"); // Redirect if emails do not match
      }
    }
  }, [employee, navigate]);

  const handleBankingDetailsSuccess = (data) => {
    console.log("Banking details saved successfully:", data);
    setActiveTab("banking");
  };

  const handleQualificationsSuccess = (data) => {
    console.log("Qualifications saved successfully:", data);
    setActiveTab("qualifications");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={EmployeeDetailsCSS.error}>{error}</div>;

  // Render nothing or a message if the employee data is not set
  if (!employee) return null;

  return (
    <div className={EmployeeDetailsCSS.container}>
      <div className={EmployeeDetailsCSS.leftSide}>
        <div className={EmployeeDetailsCSS.sidebar}>
          <Sidebar />
        </div>
      </div>

      <div className={EmployeeDetailsCSS.content}>
        <div className={EmployeeDetailsCSS.profileHeader}>
          {/* Profile Picture and Basic Info */}
          <div className={EmployeeDetailsCSS.profileInfo}>
            <div className={EmployeeDetailsCSS.profilePicture}>
              <img
                src={employee.url}
                alt={`${employee.name} ${employee.surname}`}
                className={EmployeeDetailsCSS.employeeImage}
              />
            </div>
            <div>
              <h2>
                {employee.name} {employee.surname}
              </h2>
              <p>{employee.position || "Position Not Available"}</p>
              <p>{employee.level || "Level Not Available"}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className={EmployeeDetailsCSS.tabs}>
            <button onClick={() => setActiveTab("profile")}>Profile Info</button>
            <button onClick={() => setActiveTab("banking")}>Banking Details</button>
            <button onClick={() => setActiveTab("qualifications")}>Qualifications</button>
            <button onClick={() => setActiveTab("jobTitle")}>Job Title</button>
            <button onClick={() => setActiveTab("reports")}>Reports</button>
          </div>
        </div>

        <div className={EmployeeDetailsCSS.details}>
          {activeTab === "banking" && (
            <BankingDetail
              appUserId={employee.appUserId}
              onSuccess={handleBankingDetailsSuccess}
            />
          )}
          {activeTab === "qualifications" && (
            <Qualifications
              appUserId={employee.appUserId}
              onSuccess={handleQualificationsSuccess}
            />
          )}
          {activeTab === "profile" && (
            <>
              {/* Basic Details */}
              <div className={EmployeeDetailsCSS.section}>
                <h3>Basic Details</h3>
                <div className={EmployeeDetailsCSS.row}>
                  <div className={EmployeeDetailsCSS.inputGroup}>
                    <p><strong>Date of Birth:</strong></p>
                    <input
                      value={new Date(employee.dateOfBirth).toLocaleDateString()}
                      className={EmployeeDetailsCSS.inputField}
                      readOnly
                    />
                  </div>
                  <div className={EmployeeDetailsCSS.inputGroup}>
                    <p><strong>Gender:</strong></p>
                    <input
                      value={employee.gender}
                      className={EmployeeDetailsCSS.inputField}
                      readOnly
                    />
                  </div>
                </div>
                <div className={EmployeeDetailsCSS.row}>
                  <div className={EmployeeDetailsCSS.inputGroup}>
                    <p><strong>Marital Status:</strong></p>
                    <input
                      value={employee.maritalStatus}
                      className={EmployeeDetailsCSS.inputField}
                      readOnly
                    />
                  </div>
                  <div className={EmployeeDetailsCSS.inputGroup}>
                    <p><strong>Email:</strong></p>
                    <input
                      value={employee.email}
                      className={EmployeeDetailsCSS.inputField}
                      readOnly
                    />
                  </div>
                </div>
                <div className={EmployeeDetailsCSS.row}>
                  <div className={EmployeeDetailsCSS.inputGroup}>
                    <p><strong>Identity Number:</strong></p>
                    <input
                      value={employee.identityNumber}
                      className={EmployeeDetailsCSS.inputField}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Employment Details */}
              <div className={EmployeeDetailsCSS.section}>
                <h3>Employment Details</h3>
                <div className={EmployeeDetailsCSS.row}>
                  <div className={EmployeeDetailsCSS.inputGroup}>
                    <p><strong>Contract Type:</strong></p>
                    <input
                      value={employee.contractType}
                      className={EmployeeDetailsCSS.inputField}
                      readOnly
                    />
                  </div>
                  <div className={EmployeeDetailsCSS.inputGroup}>
                    <p><strong>Start Date:</strong></p>
                    <input
                      value={employee.startDate}
                      className={EmployeeDetailsCSS.inputField}
                      readOnly
                    />
                  </div>
                </div>
                <div className={EmployeeDetailsCSS.row}>
                  <div className={EmployeeDetailsCSS.inputGroup}>
                    <p><strong>End Date:</strong></p>
                    <input
                      value={employee.endDate}
                      className={EmployeeDetailsCSS.inputField}
                      readOnly
                    />
                  </div>
                  <div className={EmployeeDetailsCSS.inputGroup}>
                    <p><strong>Tax Number:</strong></p>
                    <input
                      value={employee.taxNumber}
                      className={EmployeeDetailsCSS.inputField}
                      readOnly
                    />
                  </div>
                </div>
                <div className={EmployeeDetailsCSS.row}>
                  <div className={EmployeeDetailsCSS.inputGroup}>
                    <p><strong>Salary:</strong></p>
                    <input
                      value={employee.salary}
                      className={EmployeeDetailsCSS.inputField}
                      readOnly
                    />
                  </div>
                  <div className={EmployeeDetailsCSS.inputGroup}>
                    <p><strong>Physical Address:</strong></p>
                    <input
                      value={employee.physicalAddress}
                      className={EmployeeDetailsCSS.inputField}
                      readOnly
                    />
                  </div>
                </div>
                <div className={EmployeeDetailsCSS.row}>
                  <div className={EmployeeDetailsCSS.inputGroup}>
                    <p><strong>Postal Address:</strong></p>
                    <input
                      value={employee.postalAddress}
                      className={EmployeeDetailsCSS.inputField}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
