import RegisterForm from "../component/registerForm.tsx";
import BackGround1 from "../component/backGround1.tsx";
import styles from './RegisterPage.module.css';
import { useNavigate } from "react-router-dom";
import Logo from "../component/logo.tsx";
import bgImage from '../images/bg1.png';


const SignupPage = () => {
  const navigate = useNavigate();

  // Formik `onSubmit` handler that receives form values instead of `event`
  const handleSubmit = async (values: {
    first_name: string;
    last_name: string;
    mobile: string;
    email: string;
    password: string;
    confirm_password: string;
  }) => {
    const userData = {
      first_name: values.first_name,
      last_name: values.last_name,
      mobile: values.mobile,
      email: values.email,
      password: values.password,
      confirm_password: values.confirm_password,
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
        // Redirect to verification page upon successful registration
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
    <div className={styles.container}>
      <Logo />
      <img className={styles.bgImg} src={bgImage} alt="Background" />
      <div className={styles.registerContainer}>
        {/* Pass handleSubmit directly to Formik as an onSubmit prop */}
        <RegisterForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default SignupPage;
