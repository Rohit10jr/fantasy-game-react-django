import BackGround2 from "../component/backGround2.tsx";
import Capsule from "../component/capsule.tsx";
import PlayerCard from "../component/cardDetail.tsx";
import Header from "../component/header.tsx";
import Logo from "../component/logo.tsx";
import styles from './newRounds.module.css';

const MyRound=()=>{
    return (<>
    <div className={styles.container}>
        <Logo/>
        <BackGround2/>
        <div className={styles.header}>
        <Header/>
        <Capsule/>
            {/* <div className="header1"></div> */}
            {/* logo user name hamburger nav */}
            {/* <div className="header2"> */}
                {/* new roudns and my roudns btn */}
            {/* </div> */}
        </div>
        <div className={styles.mainContainer}>
            <PlayerCard/>
            {/* <PlayerCard/>
            <PlayerCard/> */}
        </div>
    </div>

    </>
    )
}

export default MyRound