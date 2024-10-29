import React, { useState, useEffect } from "react";
import axios from "axios";
import QualificationsCSS from "./Qualifications.module.css"; // Ensure this CSS module is created

const Qualifications = ({ employeeId }) => {
  const [qualifications, setQualifications] = useState([]);
  const [qualificationType, setQualificationType] = useState("");
  const [yearCompleted, setYearCompleted] = useState("");
  const [institution, setInstitution] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false); // State to toggle edit mode
  const [selectedQualification, setSelectedQualification] = useState(null);
  const [userID, setUserID] = useState(null); // Track which qualification is selected for editing

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user?.userID;
    if (!id) {
      console.error("No user ID found in local storage.");
    }
    setUserID(id);
  }, []);

  // Function to fetch qualifications
  const fetchQualifications = async () => {
    try {
      if (!userID) return; // Exit if userID is not set

      const response = await axios.get(`http://localhost:5239/api/qualifications?employeeId=${userID}`);
      setQualifications(response.data);
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching qualifications.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch qualifications on component mount or when userID changes
  useEffect(() => {
    fetchQualifications();
  }, [userID]);

  // Function to post a new qualification
  const handlePostQualification = async (e) => {
    e.preventDefault();

    if (!userID) {
      console.error("User ID is not set. Qualification not posted.");
      return; // Exit early
    }

    try {
      const newQualification = {
        qualificationType,
        yearCompleted: yearCompleted.split("-")[0], // Extracting the year directly from YYYY-MM format
        institution,
        employeeId: userID, // Use userID here
      };

      console.log("Posting qualification:", newQualification); // Log to check data being sent

      await axios.post("http://localhost:5239/api/qualifications", newQualification);
      // Clear input fields
      setQualificationType("");
      setYearCompleted("");
      setInstitution("");
      // Re-fetch qualifications after posting a new one
      fetchQualifications();
    } catch (err) {
      console.error(err);
      setError("An error occurred while posting the qualification.");
    }
  }

  // Function to handle editing a qualification
  const handleEditQualification = (qualification) => {
    setSelectedQualification(qualification);
    setQualificationType(qualification.qualificationType);
    setYearCompleted(qualification.yearCompleted);
    setInstitution(qualification.institution);
    setIsEditable(true);
  };

  // Function to submit the edited qualification
  const handleUpdateQualification = async (e) => {
    e.preventDefault();

    try {
      const updatedQualification = {
        ...selectedQualification,
        qualificationType,
        yearCompleted: yearCompleted.split("-")[0], // Extract year for update
        institution,
      };

      await axios.put(`http://localhost:5239/api/qualifications/${selectedQualification.id}`, updatedQualification);
      setIsEditable(false); // Exit edit mode
      setSelectedQualification(null); // Reset selected qualification
      // Clear input fields
      setQualificationType("");
      setYearCompleted("");
      setInstitution("");
      // Re-fetch qualifications after updating
      fetchQualifications();
    } catch (err) {
      console.error(err);
      setError("An error occurred while updating the qualification.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={QualificationsCSS.error}>{error}</div>;

  return (
    <div className={QualificationsCSS.container}>
        <h2>Qualifications</h2>
        

        <div className={QualificationsCSS.qualificationsList}>
            <h3>Existing Qualifications:</h3>
            <ul>
                {qualifications.map((qualification) => (
                    <li key={qualification.id}>
                        {qualification.qualificationType} ({qualification.yearCompleted}) - {qualification.institution}
                        <button onClick={() => handleEditQualification(qualification)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
        <form onSubmit={isEditable ? handleUpdateQualification : handlePostQualification} className={QualificationsCSS.form}>
        <h3>Add Qualifications:</h3>
            <input
                type="text"
                placeholder="Qualification Type"
                value={qualificationType}
                onChange={(e) => setQualificationType(e.target.value)}
                required
            />
            <input
                type="month" // Use month input type for better UX in selecting year
                placeholder="Year Completed"
                value={yearCompleted}
                onChange={(e) => setYearCompleted(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Institution"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                required
            />
            <button type="submit">{isEditable ? "Update Qualification" : "Add Qualification"}</button>
            {isEditable && <button type="button" onClick={() => setIsEditable(false)}>Cancel</button>}
        </form>
    </div>
);
};

export default Qualifications;