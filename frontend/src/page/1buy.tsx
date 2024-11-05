import React from 'react'
import styles from './1buy.module.css'
import Verify from '../images/verify.svg'
import money from '../images/moneys.svg'

const Buy = () => {
  return (
    <>

<div className={styles.outerContainer} id="card">
            <div className={styles.innerContainer}>
                <h2>Pick number of tokens you want?</h2>
                <div className={styles.tokenOptions}>
                    <div className={styles.tokenOption}>1 Token</div>
                    <div className={styles.tokenOption}>2 Tokens</div>
                    <div className={styles.tokenOption}>5 Tokens</div>
                    <div className={styles.tokenOption}>10 Tokens</div>
                </div>
                <button className={styles.buyTokensButton}>
                    Buy Tokens
                    <img src={money} alt="Buy Icon" className={styles.buttonIcon} />
                </button>
                <div className={styles.securityMessage}>
                    <span>Your security is important to us</span>
                    <img src={Verify} className={styles.securityIcon} />
                </div>
            </div>
        </div>
    
    </>
  )
}

export default Buy;