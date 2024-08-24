import React from 'react';
// import './cardDetail.module.css';
import './cardDetail.css';

import leagueImg from '../images/league-logo.png';  
import waitImg from '../images/waitlist.png';  
import redline from '../images/redline.png';
import editTag from '../images/edit-tag.png';
import iTag from '../images/i-tag.png';
import userLogo from '../images/user-logo.png';
import polygon from '../images/polygon1.png';
// import polygon from '../images/Polygon 1.png';


const PlayerCard = () => {
  return (
    <div className="containerCard">
      <div className="inner-div1">
        <div className="inner11">
          <img className="league-img" src={leagueImg} alt="League Logo" />
          <p>3/5 ready to split</p>
        </div>
        <div className="inner12">
          <img className="wait-img" src={waitImg} alt="Waitlist" />
          <span className="wait-num">
            <span className="span-outer">
              <span className="span-num">5000</span>
              <span className="span-text">AED</span>
            </span>
          </span>
        </div>
      </div>

      <img className="redline" src={redline} alt="Redline" />

      <div className="inner-div">
        <div className="inner2 voteinner">
          <div className="vote-btn">
            <p>Vote Now</p>
            <span><img src={editTag} alt="Edit Tag" /></span>
          </div>
          <div className="i-btn">
            <p>Edit Now</p>
            <span><img src={iTag} alt="I Tag" /></span>
          </div>
        </div>
        <div className="inner2">
          <span><img src={userLogo} alt="User Logo" /></span>
          <span><img className="polygon" src={polygon} alt="Polygon" /></span>
          <span>234</span>
        </div>
      </div>

      <div className="timer-container">
        <div className="time-unit">
          <span className="time-value">02</span>
          <span className="time-label">Days</span>
        </div>
        <div className="time-unit">
          <span className="time-value">06</span>
          <span className="time-label">Hours</span>
        </div>
        <div className="time-unit">
          <span className="time-value">23</span>
          <span className="time-label">Mins</span>
        </div>
        <div className="time-unit">
          <span className="time-value">45</span>
          <span className="time-label">Secs</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
