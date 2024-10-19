import styles from './verifyotp.module.css'


const VerifyOtp = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.verifyContainer}>
                    <form action="">
                        <span className={styles.verifyTitle}>
                            <h2>Enter Code</h2>
                            <p>Please enter the verification code that we sent to <span>abc@email.com</span> </p>
                        </span>

                        <div className={styles.otpInputGroup}>
                            <input type="text" maxLength={1} />
                            <input type="text" maxLength={1} />
                            <input type="text" maxLength={1} />
                            <input type="text" maxLength={1} />
                        </div>

                        <button type="submit" className={styles.verifyButton}>Verify Code</button>

                        <div className={styles.resendCode}>
                            <a href="#">Didn't receive code?  <span>Resend code </span> in 00:12</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default VerifyOtp