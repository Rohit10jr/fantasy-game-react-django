import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './RegisterPage.module.css';
import './RegisterPage.css';
import bgImage from '../images/bg1.png';
import logoImage from '../images/logo.png';
import getCSRFToken from 'csrf-token'

interface InputRowProps {
  children: React.ReactNode;
}

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const userData = {
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      mobile: formData.get('mobile') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirm_password: formData.get('confirm_password') as string,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Redirect to login page upon successful registration
        navigate('/login');
      } else {
        // Handle errors here
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="container">
      <img className="bg-img" src={bgImage} alt="Background" />
      <img className="logo-png" src={logoImage} alt="Logo" />
      <div className="register-container">
        <RegisterForm onSubmit={handleRegister} />
      </div>
    </div>
  );
};

const RegisterForm: React.FC<{ onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }> = ({ onSubmit }) => {
  return (
    <div className="inner-container">
      <div className="register-title">
        <h2>Sign Up</h2>
        <p>Please enter the below details to create an account</p>
      </div>
      <form className="register-form" onSubmit={onSubmit}>
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
        <button type="submit" className="register-button">Create account</button>
      </form>
    </div>
  );
};

const InputRow: React.FC<InputRowProps> = ({ children }) => {
  return <div className="input-row">{children}</div>;
};

export default RegisterPage;
