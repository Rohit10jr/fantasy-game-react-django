import styles from './loadingbg.module.css'
import bgImage from '../images/bg1.png';

const LoadingBg = () => {
    return (
        <>

         <div className={styles.loadingBg}>
            <img className={styles.bgImg} src={bgImage} alt="Background" />
            {/* You can add a loading spinner or text here if needed */}
        </div>
        </>
    );
};

export default LoadingBg