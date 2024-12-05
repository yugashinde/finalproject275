import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import './simplequestions';
import { useLocation } from 'react-router-dom';
import video from '../video/4782596-uhd_3840_2160_30fps.mp4';
import './simpleresults.css'; 

const BasicResults: React.FC = () => {


  const location = useLocation();
  const { detailedCareer } = location.state || {};

  return (
      <><div className="simplequestions">
      <video className="background-video" src={video} autoPlay loop muted playsInline />
      <div className="container"></div>
      <HeaderComponent />
      <h1>Basic Quiz Results</h1>
      <p> {detailedCareer}</p>
    </div><p className="footer-note">Thank you for completing the quiz! We hope this helps you explore your career path.</p></>
    
  );
};

export default BasicResults;
