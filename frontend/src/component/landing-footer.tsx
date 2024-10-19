import styles from './landing-footer.module.css'



const LandingFooter = () =>{
    return (
        <>
        <footer>
        <div className={styles.footerLeft}>
        © Copyrights Reserved <a href="#">@Moneyball</a>
        </div>

        <div className={styles.footerRight}>
            <a href="">Rules</a>
            <a href="">Privacy Policy</a>
            <a href="">Terms & Conditions</a>
        </div>
        </footer>
        </>
    );
};

export default LandingFooter


