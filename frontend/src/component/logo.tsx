import React from 'react';
import styles from './logo.module.css';
import logoImage from '../images/logo.png';

const Logo = () => {
  return (
    <>
        <img className={styles.logoPng} src={logoImage} alt="Logo" />
    </>
  );
};

export default Logo;
