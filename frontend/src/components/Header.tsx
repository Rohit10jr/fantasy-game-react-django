import React from 'react';
import styles from './Header.module.css';


import logo from '../images/logo.png';
import tokens22 from '../images/22tokens.png';
import Vector36 from '../images/Vector36.png';
import nav from '../images/nav.png';
import Vector9 from '../images/Vector9.png';


const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header1}>
        <span className={styles.spanLogo}>
          <img className={styles.logoPng} src={logo} alt="Logo" />
        </span>
        <span className={styles.spanNav}>
          <img src={tokens22} alt="Tokens" />
          <img src={Vector36} alt="Vector Icon" />
          <div>
            <span>
              <p>Bharat J</p>
              <p>bharat@mail.com</p>
            </span>
            <span>
              <img src={nav} alt="Nav Icon" />
            </span>
          </div>
        </span>
      </div>
      <div className={styles.header2}>
        <div className={styles.capsuleContainer}>
          <a href="#" className={`${styles.capsuleLink} ${styles.active}`}>New Rounds</a>
          <a href="#" className={styles.capsuleLink}>My Rounds</a>
        </div>
        <img src={Vector9} alt="Vector Icon" />
      </div>
    </div>
  );
};

export default Header;
