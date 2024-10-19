import styles from './landing-team.module.css'
import  am from '../images/am.png'
import  porto from '../images/porto.png'
import  fcb from '../images/fcb.png'
import  arsn from '../images/arsn.png'
import  juve from '../images/juve.png'
import  chel from '../images/chel.png'
import  mcity from '../images/mcity.png'
import  rm from '../images/rm.png'
import  liv from '../images/liverpool.png'
import  bayern from '../images/bayern.png'


const Teams = () => {
    return (
        <>
            <div className={styles.teamlogo}>
                <img src={bayern} alt="" />
                <img src={juve} alt="" />
                <img src={am} alt="" />
                <img src={rm} alt="" />
                <img src={fcb} alt="" />
                <img src={mcity} alt="" />
                <img src={chel} alt="" />
                <img src={arsn} alt="" />
                <img src={porto} alt="" />
                <img src={liv} alt="" />
                {/* Add more <img /> elements as needed */}
            </div>

            <div className={styles.dotContainer}>
                <div className={styles.dottedline}></div>
                    <div className={styles.text}>How to play</div>
                <div className={styles.dottedline}></div>
            </div>
        </>
    );
};

export default Teams