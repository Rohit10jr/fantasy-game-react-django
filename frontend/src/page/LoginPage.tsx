import LoginForm from "../component/loginForm.tsx";
import BackGround1 from "../component/backGround1.tsx";
import styles from './LoginPage.module.css';
import { useNavigate } from "react-router-dom";
import Logo from "../component/logo.tsx";
import bgImage from '../images/bg1.png';

const LoginPages = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const userData = {
      email: formData.get('Email') as string,
      password: formData.get('Password') as string,
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
        console.log("login failed");
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
    return (
      <>
      <div className={styles.container}>
        <Logo/>
        {/* <BackGround1/> */}
        <img className={styles.bgImg} src={bgImage} alt="Background" />
        <div className={styles.loginContainer}>
        <LoginForm onSubmit={handleSubmit} />
        </div>
      </div>
      </>
    );
  };
  
  export default LoginPages;