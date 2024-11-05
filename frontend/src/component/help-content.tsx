import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './help-content.module.css';

const HelpContentSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [transactionId, setTransactionId] = useState(""); // New state for transaction ID
  const [selectStyles, setSelectStyles] = useState({
    backgroundColor: "#ffffff",
    color: "#757575",
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  useEffect(() =>{
    const email = localStorage.getItem('email') || '';
    setEmail(email);
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setIssue(selectedValue);
    setSelectStyles({
      backgroundColor: selectedValue === "" ? "#ffffff" : "#f0f0f0",
      color: "#000000",
    });

    // Clear transaction ID if not needed
    if (selectedValue !== "Unable to Buy Tokens" && selectedValue !== "Unable to Withdraw Winnings") {
      setTransactionId("");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('http://localhost:8000/api/help/', {
        email,
        issue,
        description,
        transactionId: transactionId || null, // Only include transaction ID if it’s filled
      });

      if (response.status === 200) {
        setSuccessMessage("Your help request has been received! A confirmation email has been sent.");
        setEmail("");
        setIssue("");
        setDescription("");
        setTransactionId("");
        setSelectStyles({ backgroundColor: "#ffffff", color: "#757575" });
      }
    } catch (error) {
      setError("There was an issue submitting your request. Please try again.");
    }
  };

  return (
    <div className={styles.content}>
      <h1>How Can We Assist You?</h1>
      <p>
        Please complete and submit the form below, and our team will promptly reach out to assist you.
      </p>

      <form onSubmit={handleSubmit} className={styles["form-container"]}>
        <div className={styles["form-content"]}>
          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <select
                id="issueSelect"
                style={selectStyles}
                value={issue}
                onChange={handleSelectChange}
                required
              >
                <option value="" disabled>
                  What do you need assistance with?
                </option>
                <option>Login / Sign Up</option>
                <option>Unable to Buy Tokens</option>
                <option>Unable to Play Round</option>
                <option>Unable to Withdraw Winnings</option>
                <option>Others</option>
              </select>
            </div>

            {["Unable to Buy Tokens", "Unable to Withdraw Winnings"].includes(issue) && (
              <div className={styles["form-group"]}>
                <input
                  type="text"
                  placeholder="Transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  required
                />
              </div>
            )}
          </div>

          <div className={styles["form-group"]}>
            <textarea
              placeholder="Describe your issue"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
        </div>

        {error && <p style={{ color: "red" }} className={styles.error}>{error}</p>}
        {successMessage && <p style={{ color: "green" }} className={styles.success}>{successMessage}</p>}
        
        <div className={styles["button-group"]}>
          <button type="submit" className={styles["submit-btn"]}>
            Submit
          </button>
          <button type="button" className={styles["cancel-btn"]} onClick={() => {
            setEmail("");
            setIssue("");
            setDescription("");
            setTransactionId("");
            setSelectStyles({ backgroundColor: "#ffffff", color: "#757575" });
            setError(null);
            setSuccessMessage(null);
          }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default HelpContentSection;
