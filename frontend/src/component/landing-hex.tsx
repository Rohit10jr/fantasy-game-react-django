// import React from 'react';
import styles from './landing-hex.module.css';

const HexagonSteps = () => {
    return (
        <div className={styles.hexContainer}>
            <div className={styles.hexWrapper}>
                <div className={styles.innerHex}>
                    <h2>01</h2>
                </div>
                <div className={styles.outerHex}>
                    <div className={styles.hexContent}>
                        <h3>Login</h3>
                        <span>Set up your account and create your log in details</span>
                    </div>
                </div>
            </div>

            <div className={styles.hexWrapper}>
                <div className={styles.innerHex}>
                    <h2>02</h2>
                </div>
                <div className={styles.outerHex}>
                    <div className={styles.hexContent}>
                        <h3>Play with 1 or 2 entries</h3>
                        <span>Decide if you are playing with one or two entries</span>
                    </div>
                </div>
            </div>

            <div className={styles.hexWrapper}>
                <div className={styles.innerHex}>
                    <h2>03</h2>
                </div>
                <div className={styles.outerHex}>
                    <div className={styles.hexContent}>
                    <h3>Pick a Winner</h3>
              <span
                >Pick a team from the fixtures of the next match week who you
                think will win their respective game.
              </span>
              <span
                >If your team wins, you progress to the next match week. If your
                team draws or loses, you are eliminated.</span>
                    </div>
                </div>
            </div>

            <div className={styles.hexWrapper}>
                <div className={styles.innerHex}>
                    <h2>04</h2>
                </div>
                <div className={styles.outerHex}>
                    <div className={styles.hexContent}>
                    <h3>Advance in the Game</h3>
              <span
                >Keep playing by repeating step 3, however you can no longer
                pick the teams that you have already chosen in previous match
                weeks</span>
                    </div>
                </div>
            </div>



            
            <div className={styles.hexWrapper}>
                <div className={styles.innerHex}>
                    <h2>05</h2>
                </div>
                <div className={styles.outerHex}>
                    <div className={styles.hexContent}>
                    <h3>Advance in the Game</h3>
              <span
                >Keep playing by repeating step 3, however you can no longer
                pick the teams that you have already chosen in previous match
                weeks</span>
                    </div>
                </div>
            </div>


            
        </div>
    );
};

export default HexagonSteps;