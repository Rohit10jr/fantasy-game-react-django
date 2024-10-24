import styles from './landing-header.module.css'
// import './landing-header.css'
import logo from '../images/logo.png'



const Header = () => {
    return (
      <>
      <div> 
      <div className={styles.header}>
        <div className={styles.logoTitle}>
          <img src={logo} alt="Logo" />
        </div>
        <div className={styles.authlinks}>
          <p>Not a member yet?</p>
          <a className={styles.registerAtag} href="/register">Register Now</a>
          <a href="/login"className={styles.loginbtn}>Login</a>
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