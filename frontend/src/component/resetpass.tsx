import styles from './resetpass.module.css'

const ResetPass = ()=>{
    return (
<>

        <div className={styles.container}>
        <div className={styles.resetContainer}>
            <form action="">
                <span className={styles.resetTitle}>
                    <h2>Reset your password?</h2>
                    <p>Please enter a strong password with at least six characters</p>
                </span>

                <div className={styles.inputContainer}>
                    <label htmlFor="email">
                    </label>
                    <input type="password" id="newPassword" placeholder="New Password*" />
                </div>
                
                <div className={styles.inputContainer}>
                    <label htmlFor="password">
                    </label>
                    <input type="password" id="confirmPassword" placeholder="Confirm New Password*" />
                </div>

                <button type="submit" className={styles.resetButton}>Reset Password</button>
            </form>
        </div>
        </div>
        </>
    );
};

export default ResetPass;