import styles from "./forgotpass.module.css";
import vector from "../images/Vector13.png";
import email from "../images/email.png";

const ForgotPass = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.forgotContainer}>
          <form action="">
            <span className={styles.verifyTitle}>
              <h2>Forgot your password?</h2>
              <p>
                Please enter the email address you would like to reset password
              </p>
            </span>

            <div className={styles.forgotInputContainer}>
              <label htmlFor="email">
                <img src={email} alt="Email Icon" />
                <img src={vector} alt="Email Icon" />
              </label>
              <input type="email" id="email" placeholder="Email" />
            </div>

            <button type="submit" className={styles.verifyButton}>
              Send verification code
            </button>

            <p className={styles.backtotext}>
              <a>back to Login</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
