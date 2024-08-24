import React from 'react';
import styles from './backGround1.module.css';
import bgImage from '../images/bg1.png';
import logoImage from '../images/logo.png';

const BackGround1 = () => {
  return (
    <>
      {/* <div className={styles.container}> */}
        {/* <img className={styles.logoPng} src={logoImage} alt="Logo" /> */}
        <img className={styles.bgImg} src={bgImage} alt="Background" />
      {/* </div> */}
    </>
  );
};

export default BackGround1;
