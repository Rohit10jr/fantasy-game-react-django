import React, { FC, FormEvent } from "react";
import styles from './loginForm.module.css';
import emailIcon from '../images/email.png';
import lockIcon from '../images/lock.png';
import vectorIcon from '../images/vector13.png'; 
// Assuming the second image is named vector13.png

interface InputContainerProps {
  icon1: string;
  icon2: string;
  children: React.ReactNode;
}

const InputContainer: FC<InputContainerProps> = ({ icon1, icon2, children }) => (
  <div className={styles.inputContainer}>
    <label>
      <img src={icon1} alt="Icon 1" />
      <img src={icon2} alt="Icon 2" />
    </label>
    {children}
  </div>
);

interface LoginFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => (
  <form className={styles.loginForm} onSubmit={onSubmit}>
    <span className={styles.loginTitle}>
      <h2>Login</h2>
      <p>Please login with your email</p>
    </span>

    <InputContainer icon1={emailIcon} icon2={vectorIcon}>
      <input type="email" name="Email" placeholder="Email" required />
    </InputContainer>

    <InputContainer icon1={lockIcon} icon2={vectorIcon}>
      <input type="password" name="Password" placeholder="Password" required />
    </InputContainer>

    <a href="/forgot" className={styles.forgotText}>Forgot Password?</a>

    <button type="submit" className={styles.loginButton}>Login</button>
    <p className={styles.signupText}>
      Didn’t have an account? <a href="/register">Sign up</a>
    </p>
  </form>
);

export default LoginForm;
