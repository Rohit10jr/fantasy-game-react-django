import React from 'react';
import Header from '../components/Header';
import ContainerComponent from '../components/ContainerComponent';
import './MainComponent.css';
import bg2 from '../images/bg2.png';


const MainComponent = () => {
    return (
      <div className="main-container">
        <img className="bg-img" src={bg2} alt="Background" />
  
        <Header />
        <ContainerComponent />
      </div>
    );
  };

export default MainComponent;
