
import LoadingBg from "../component/loadingbg";
import Logo from "../component/logo";
import styles from "./forgetpage.module.css"
import vector from "../images/Vector13.png";
import emailIcon  from "../images/email.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";


const ForgotPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter an email address.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/forgot/", {
        email
      });

      if (response.status === 200) {
        setSuccess("Verification code sent to your email.");
        setError("");
        localStorage.setItem('forgotemail', email);

        // Store email in localStorage for OTP verification page
        localStorage.setItem("email", email);

        // Redirect to OTP verification page after 3 seconds
        setTimeout(() => {
          navigate("/forgotverify");
        }, 3000);
      }
    } catch (error: unknown) {
      const err = error as AxiosError;
      if (err.response) {
        if (err.response.status === 404) {
          setError("User with this email does not exist.");
        } else {
          setError("An error occurred. Please try again.");
        }
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Logo />
      <LoadingBg />

      <div className={styles.container}>
        <div className={styles.forgotContainer}>
          <form onSubmit={handleSubmit}>
            <span className={styles.verifyTitle}>
              <h2>Forgot your password?</h2>
              <p>
                Please enter the email address you would like to reset password
              </p>
            </span>

            <div className={styles.forgotInputContainer}>
              <label htmlFor="email">
                <img src={emailIcon} alt="Email Icon" />
                <img src={vector} alt="Email Icon" />
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Handle email input
              />
            </div>

            <button type="submit" className={styles.verifyButton}>
              Send verification code
            </button>

            {/* Display success or error message */}
            {success && <p style={{ color: "green" }}>{success}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <p className={styles.backtotext}>
              <a href="/login">Back to Login</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPage;
