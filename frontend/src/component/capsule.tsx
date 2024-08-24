import styles from './capsule.module.css';
import Vector9 from '../images/Vector9.png';
import { NavLink } from 'react-router-dom';

const Capsule =() =>{
    return (
        <>
        <div className={styles.header2}>
        <div className={styles.capsuleContainer}>
          {/* <a href="/home" className={`${styles.capsuleLink} ${styles.active}`}>New Rounds</a>
          <a href="/myround" className={styles.capsuleLink}>My Rounds</a> */}
          <NavLink
          to="/home"
          className={({ isActive }) =>
            `${styles.capsuleLink} ${isActive ? styles.active : ''}`
          }
        >
          New Rounds
        </NavLink>
        <NavLink
          to="/myround"
          className={({ isActive }) =>
            `${styles.capsuleLink} ${isActive ? styles.active : ''}`
          }
        >
          My Rounds
        </NavLink>
        </div>
        <img src={Vector9} alt="Vector Icon" />
      </div>
        </>
    )
}

export default Capsule