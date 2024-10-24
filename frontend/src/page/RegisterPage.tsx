import RegisterForm from "../component/registerForm.tsx";
import BackGround1 from "../component/backGround1.tsx";
import styles from './RegisterPage.module.css';
import { useNavigate } from "react-router-dom";
import Logo from "../component/logo.tsx";
import bgImage from '../images/bg1.png';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
        localStorage.setItem('email', userData.email);
        // Redirect to login page upon successful registration
        navigate('/verify');
      } else {
        // Handle errors here
        console.error('Registration failed');
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
        <div className={styles.registerContainer}>
        <RegisterForm onSubmit={handleSubmit} />
        </div>
      </div>
      </>
    );
  };
  
  export default SignupPage;