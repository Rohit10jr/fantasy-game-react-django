import styles from './landing-header.module.css'
// import './landing-header.css'
import logo from '../images/logo.png'
import React, { useEffect, useState } from 'react';


interface HeaderProps {
  showRegister?: boolean;
  homeInsteadOfLogin?: boolean;
}



const Header: React.FC<HeaderProps> = ({ showRegister = true, homeInsteadOfLogin = false }) => {

  const [email, setEmail] = useState("");
  
  useEffect(() =>{
    const email = localStorage.getItem('email') || '';
    setEmail(email);
  }, []);

    return (
      <>
      <div> 
      <div className={styles.header}>
        <div className={styles.logoTitle}>
          <img src={logo} alt="Logo" />
        </div>
        <div className={styles.authlinks}>
          {showRegister && (
            <>
              <p>Not a member yet?</p>
              <a className={styles.registerAtag} href="/register">Register Now</a>
            </>
          )}
          {/* <a href={homeInsteadOfLogin ? "/home" : "/login"} className={styles.loginbtn}>
            {homeInsteadOfLogin ? "Play Now" : "Login"}
          </a> */}

          <a href={email ? "/home" : homeInsteadOfLogin ? "/" : "/login"} className={styles.loginbtn}>
          {homeInsteadOfLogin ? "Play Now" : "Login"}
        </a>
          
        </div>
      </div>
      <div className={styles.horizontalline}></div>
      </div>
{/* 
<div> 
      <div className={"header"}>
        <div className={"logoTitle"}>
          <img src={logo} alt="Logo" />
        </div>
        <div className={"authlinks"}>
          <p>Not a member yet?</p>
          <a href="#">Register Now</a>
          <button className={"loginbtn"}>Login</button>
        </div>
      </div>
      <div className={"horizontalline"}></div>
      </div> */}
      </>
    );
  };
  
  export default Header;