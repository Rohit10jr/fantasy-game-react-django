import React from 'react';
import styles from './backGround1.module.css';
import bgImage from '../images/bg2.png';

const BackGround2 = () => {
  return (
    <>
      {/* <div className={styles.container}> */}
        <img className={styles.bgImg} src={bgImage} alt="Background" />
      {/* </div> */}
    </>
  );
};

export default BackGround2;
