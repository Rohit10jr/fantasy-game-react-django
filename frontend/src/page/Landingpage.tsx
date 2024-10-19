import Header from '../component/landing-header.tsx'
import ContentSection from '../component/landing-content.tsx'
import Teams from '../component/landing-team.tsx'
import HexagonSteps from '../component/landing-hex.tsx'
import './Landingpage.module.css'
import LandingFooter from '../component/landing-footer.tsx'
const Landingpage = () => {
  return (
    <>
    {/* <div className={styles.body}> */}

    <Header/>
    <ContentSection/>
    <Teams/>
    <HexagonSteps/>
    <LandingFooter/>
    {/* </div> */}
    </>
  )
}

export default Landingpage