import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
// import styles from './LoginPage.css';
import logoImage from '../images/logo.png';
import bgImage from '../images/bg1.png';
import emailIcon from '../images/email.png';
import lockIcon from '../images/lock.png';

const InputContainer: React.FC<{ id: string; placeholder: string; icon: string }> = ({ id, placeholder, icon }) => (
  <div className={styles.inputContainer}>
    <label htmlFor={id}>
      <img src={icon} alt="Input Icon" />
    </label>
    <input type="text" id={id} name={id} placeholder={placeholder} />
  </div>
);

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const userData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        // Store token in local storage or state management
        localStorage.setItem('token', data.token);

        // Redirect to home page upon successful login
        navigate('/home');
      } else {
        // Handle errors here
        console.log("login failed")
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className={styles.container}>
      <img className={styles.bgImg} src={bgImage} alt="Background" />
      <img className={styles.logoPng} src={logoImage} alt="Logo" />

      <div className={styles.loginContainer}>
        <form onSubmit={handleLogin}>
          <span className={styles.loginTitle}>
            <h2>Login</h2>
            <p>Please login with your email</p>
          </span>

          <InputContainer id="email" placeholder="Email" icon={emailIcon} />
          <InputContainer id="password" placeholder="Password" icon={lockIcon} />

          <a href="#" className={styles.forgotText}>Forgot Password?</a>

          <button type="submit" className={styles.loginButton}>Login</button>
          <p className={styles.signupText}>
            Didn’t have an account? <a href="/register">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
