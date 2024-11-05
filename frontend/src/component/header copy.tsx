import React from 'react';
import styles from './Header.module.css';

import logo from '../images/logo.png';
import tokens22 from '../images/22tokens.png';
import Vector36 from '../images/Vector36.png';

const Header: React.FC = () => {
  const toggleMenu = () => {
    const menu = document.getElementById("dropdownMenu");
    if (menu) {
      menu.classList.toggle(styles.show);
    }
  };
  return (
    <>
      <div className={styles.header1}>
        <span className={styles.spanLogo}>
          {/* <img className={styles.logoPng} src={logo} alt="Logo" /> */}
        </span>
        <span className={styles.spanNav}>
          <img src={tokens22} alt="Tokens" />
          <img src={Vector36} alt="Vector Icon" />
          <div>
            <span>
              <p>Bharat J</p>
              <p>bharat@mail.com</p>
            </span>
            <span className={styles.menuContainer}>
              <div className={styles.hamburger} onClick={toggleMenu}>
                <div className={styles.big}></div>
                <div className={styles.small}></div>
                <div className={styles.big}></div>
                <div className={styles.small}></div>
              </div>

              {/* Dropdown Menu */}
              <div className={styles.dropdownMenu} id="dropdownMenu">
                {/* <a href="#">My Picks</a>
                <a href="#">My Purchases</a>
                <a href="#">My Winnings</a>
                <a href="#">Withdraw</a>
                <a href="#">My Profile</a>
                <a href="#">How To Play</a> */}
                <a href="http://localhost:5173/help">Help</a>
                <a href="http://localhost:5173/logout">Log Out</a>
              </div>
            </span>
          </div>
        </span>
      </div>
    </>
  );
};

export default Header;
