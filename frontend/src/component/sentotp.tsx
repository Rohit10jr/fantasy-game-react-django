import styles from './sentotp.module.css'
import vector from "../images/Vector 27.png"

const SentOtp = () =>{
        return (
          <div className={styles.container}>
      
            <div className={styles.otpContainer}>
              
              {/* Email Verification Section */}
              <div className={styles.verifySection} data-step="1">
                <h1>1. Verify your email</h1>
                <p>Please enter the code that we sent to <strong>ahamed@venzotechnologies.com</strong></p>
                <div className={styles.otpInputGroup}>
                  <input type="text" maxLength={1} />
                  <input type="text" maxLength={1} />
                  <input type="text" maxLength={1} />
                  <input type="text" maxLength={1} />
                </div>
                <div className={styles.resendCode}>
                  <a href="#">Didn't receive code?<span className={styles.blue}> Resend code</span> in <span>00:12</span></a>
                </div>
                <button className={styles.verifyBtn}>Verify Code</button>
              </div>
      
              {/* Horizontal Divider (Image) */}
              <div className={styles.divider}>
                <img src={vector} alt="divider" />
              </div>
      
              {/* Mobile Verification Section */}
              <div className={styles.verifySection} data-step="2">
                <h1>2. Verify your mobile number</h1>
                <p>Please enter the code that we sent to <strong>+91 90282 76382</strong></p>
                <div className={styles.otpInputGroup}>
                  <input type="text" maxLength={1} />
                  <input type="text" maxLength={1} />
                  <input type="text" maxLength={1} />
                  <input type="text" maxLength={1} />
                </div>
                <div className={styles.resendCode}>
                  <a href="#">Didn't receive code? <span className={styles.blue}>Resend code</span> in <span>00:12</span></a>
                </div>
                <button className={styles.verifyBtn}>Verify Code</button>
              </div>
      
            </div>
          </div>
        );
      };
      
      export default SentOtp;