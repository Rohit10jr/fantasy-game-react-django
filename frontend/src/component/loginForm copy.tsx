import React, {FC, FormEvent} from "react";
import styles from './loginForm.module.css'
// import bgImage from '../images/bg1.png';
import emailIcon from '../images/email.png';
import lockIcon from '../images/lock.png';


interface InputRowProps{
      icon: string; // Path to the icon image
    children: React.ReactNode;
}

const InputRow: FC<InputRowProps> = ({ children }) => (
    <div className={styles.inputRow}>
      {children}
    </div>
  );

interface LoginFormProps{
    onSubmit: (event: FormEvent<HTMLFormElement>)=>void;
}


const LoginForm: FC<LoginFormProps> = ({ onSubmit }) =>(
    // <div className={styles.loginContainer}>
    <form  className={styles.loginForm} onSubmit={onSubmit}>
      <span className={styles.loginTitle}>
        <h2>Login</h2>
        <p>Please login with your email</p>
      </span>

     
    <InputRow icon={emailIcon}>
      <input type="text" name="Email" placeholder="Email*" required />
    </InputRow>

    <InputRow icon={lockIcon}>
      <input type="password" name="Password" placeholder="Password*" required />
    </InputRow>

      <a href="#" className={styles.forgotText}>Forgot Password?</a>

      <button type="submit" className={styles.loginButton}>Login</button>
      <p className={styles.signupText}>
        Didn’t have an account? <a href="/register">Sign up</a>
      </p>
    </form>
//   </div>
  );

  
export default LoginForm;