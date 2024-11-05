import Header from '../component/landing-header.tsx'
import HelpContentSection from '../component/help-content.tsx'

const Help = () => {
  return (<>
   
   <Header showRegister={false} homeInsteadOfLogin={true}/>
   <HelpContentSection/>
  </>
  )
}

export default Help