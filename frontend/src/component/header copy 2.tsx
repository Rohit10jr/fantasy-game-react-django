import React, { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css';

import logo from '../images/logo.png';
import tokens22 from '../images/22tokens.png';
import Vector36 from '../images/Vector36.png';
import wallet from '../images/wallet.svg';
import addbase from '../images/addbase.svg';
import add from '../images/add.svg';
import money from '../images/moneys.svg'; // Add the correct path for the money icon
import Verify from '../images/verify.svg'; // Add the correct path for the Verify icon

const Header: React.FC = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
  
    useEffect(() => {
      // Retrieve name and email from local storage
      const firstName = localStorage.getItem('firstName') || '';
      const email = localStorage.getItem('email') || '';
  
      setUserName(firstName);
      setEmail(email);
    }, []);

  const [isCardVisible, setIsCardVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    const menu = document.getElementById("dropdownMenu");
    if (menu) {
      menu.classList.toggle(styles.show);
    }
  };

  const toggleCard = () => {
    setIsCardVisible((prevVisible) => !prevVisible);
  };

  // Hide card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsCardVisible(false);
      }
    };

    if (isCardVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCardVisible]);

  return (
    <>
      <div className={styles.header1}>
        <span className={styles.spanLogo}>
          <img className={styles.logoPng} src={logo} alt="Logo" />
        </span>
        <span className={styles.spanNav}>
          <div className={styles.tokenadd} onClick={toggleCard}>
            <img src={wallet} alt="Wallet Icon" />
            <a href="#">22 Token</a>
            {/* <a href="#">{purchaseTokens !== null ? `${purchaseTokens} Tokens` : 'Loading...'}</a> */}
            <div className={styles.addbase}>
              <img className={styles.addimgbase} src={addbase} alt="Add Base" />
              <img className={styles.add} src={add} alt="Add Icon" />
            </div>
          </div>
          <img className={styles.Vector36} src={Vector36} alt="Vector Icon" />
          <div className={styles.username}>
            <span className={styles.userDetails}>
              <p className={styles.userName}>{userName}</p>
              <p>{email}</p>
            </span>
          </div>
          <span className={styles.menuContainer}>
            <div className={styles.hamburger} onClick={toggleMenu}>
              <div className={styles.big}></div>
              <div className={styles.small}></div>
              <div className={styles.big}></div>
              <div className={styles.small}></div>
            </div>

            {/* Dropdown Menu */}
            <div className={styles.dropdownMenu} id="dropdownMenu">
              <a href="#">My Picks</a>
              <a href="#">How To Play</a>
              <a href="http://localhost:5173/help">Help</a>
              <a href="http://localhost:5173/logout">Log Out</a>
            </div>
          </span>
        </span>
      </div>

      {isCardVisible && (
        <>
          <div className={styles.overlay}></div>
          <div className={styles.outerContainer} ref={cardRef}>
            <div className={styles.innerContainer}>
              <h2>Pick number of tokens you want?</h2>
              <div className={styles.tokenOptions}>
                <div className={styles.tokenOption}>1 Token</div>
                <div className={styles.tokenOption}>2 Tokens</div>
                <div className={styles.tokenOption}>5 Tokens</div>
                <div className={styles.tokenOption}>10 Tokens</div>
              </div>
              <button className={styles.buyTokensButton}>
                Buy Tokens
                <img src={money} alt="Buy Icon" className={styles.buttonIcon} />
              </button>
              <div className={styles.securityMessage}>
                <span>Your security is important to us</span>
                <img src={Verify} alt="Security Icon" className={styles.securityIcon} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
