import React from 'react';
import styles from './NotFoundPage.module.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Page Not Found</p>
      <a href="/home" className={styles.homeLink}>Go to Home</a>
    </div>
  );
};

export default NotFoundPage;
