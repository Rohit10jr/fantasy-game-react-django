import React, { FC, FormEvent } from 'react';
import styles from './registerForm.module.css';

interface InputRowProps {
  children: React.ReactNode;
}

const InputRow: FC<InputRowProps> = ({ children }) => (
  <div className={styles.inputRow}>
    {children}
  </div>
);

interface RegisterFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ onSubmit }) => (
  <div className={styles.registerContainer}>
  <div className={styles.innerContainer}>
    <div className={styles.registerTitle}>
      <h2>Sign Up</h2>
      <p>Please enter the below details to create an account</p>
    </div>
    <form className={styles.registerForm} onSubmit={onSubmit}>
      <InputRow>
        <input type="text" name="first_name" placeholder="First Name*" required />
        <input type="text" name="last_name" placeholder="Last Name*" required />
      </InputRow>
      <InputRow>
        <input type="text" name="mobile" placeholder="Mobile Number*" required />
        <input type="email" name="email" placeholder="Email*" required />
      </InputRow>
      <InputRow>
        <input type="password" name="password" placeholder="Password*" required />
        <input type="password" name="confirm_password" placeholder="Confirm Password*" required />
      </InputRow>
      <button type="submit" className={styles.registerButton}>Create account</button>
    </form>
  </div>
</div>
);

export default RegisterForm;
