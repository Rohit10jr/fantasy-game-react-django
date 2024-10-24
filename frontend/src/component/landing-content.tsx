// import React from 'react';
import styles from './landing-content.module.css';

const ContentSection = () => {
  return (
    <div className={styles.content}>
      <h1>Play Moneyball</h1>
      <h2>Pick your predictions and win Prizes!</h2>
      <p>Ready to kick off the excitement? Log in and let the game begin!</p>
      <a href="/login" className={styles.loginbtn}>Login</a>
    </div>
  );
};

export default ContentSection;