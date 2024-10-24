import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import LoadingBg from "../component/loadingbg.tsx";
import Logo from "../component/logo.tsx";
import styles from "./verifyotp.module.css";
import { useNavigate } from 'react-router-dom';

const ForgotVerify = () => {
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate(); 

    useEffect(() => {
        // Retrieve email from localStorage when the component mounts
        const storedEmail = localStorage.getItem("forgotemail");
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            setError("No email found. Please register again.");
        }
    }, []);

    // Redirect to login after success message
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate("/login");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [success, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join(""); // Join the 4 inputs into a single string

        if (otpCode.length !== 4) {
            setError("Please enter a valid 4-digit OTP.");
            return;
        }

        try {
            // Step 1: Verify OTP
            const response = await axios.post("http://127.0.0.1:8000/api/forgotverify/", {
                email,
                otp: otpCode
            });

            // Check if the OTP verification is successful
            if (response.status === 200) {
                setSuccess("OTP verified successfully. You can now reset your password.");
                setError("");
                
                // Step 2: Send reset password link
                await sendResetLink();
            }
        } catch (error: unknown) {
            const err = error as AxiosError;

            if (err.response) {
                if (err.response.status === 400) {
                    setError("Invalid OTP or user already verified.");
                } else if (err.response.status === 404) {
                    setError("User not found.");
                } else {
                    setError("An error occurred. Please try again.");
                }
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    // Function to send reset password link
    const sendResetLink = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/send-reset-password-link/", { email });
            if (response.status === 200) {
                console.log("Reset password link sent successfully."); // Logging success message
            } else {
                setError("Failed to send the reset password link.");
            }
        } catch (error: unknown) {
            const err = error as AxiosError;
            console.error('Reset Password Link Error:', err); // Logging the error
            setError("An error occurred while sending the reset password link.");
        }
    };

    return (
        <>
            <LoadingBg />
            <Logo />

            <div className={styles.container}>
                <div className={styles.verifyContainer}>
                    <form onSubmit={handleSubmit}>
                        <span className={styles.verifyTitle}>
                            <h2>Enter Code</h2>
                            <p>Please enter the verification code that we sent to <span>{email}</span></p>
                        </span>

                        <div className={styles.otpInputGroup}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => {
                                        const newOtp = [...otp];
                                        newOtp[index] = e.target.value;
                                        setOtp(newOtp);
                                    }}
                                />
                            ))}
                        </div>

                        <button type="submit" className={styles.verifyButton}>Verify Code</button>

                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}

                        <div className={styles.resendCode}>
                            <a href="#">Didn't receive code? <span>Resend code</span> in 00:12</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgotVerify;
