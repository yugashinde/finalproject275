import React from 'react';
import HeaderComponent from '../components/HeaderComponent';

import './simplequestions';
import { useLocation } from 'react-router-dom';

import video from '../video/4782596-uhd_3840_2160_30fps.mp4';
import './simpleresults.css'; // Ensure correct file import

const BasicResults: React.FC = () => {
  let c = localStorage.getItem("career");
  let pr = localStorage.getItem("p");
  let apik = localStorage.getItem("MYKEY");


  const location = useLocation();
  const { career } = location.state || {};

  return (
      <><div className="simplequestions">
      <video className="background-video" src={video} autoPlay loop muted playsInline />
      <div className="container"></div>
      <HeaderComponent />




      <h1>Basic Quiz Results</h1>
      <p> {career}</p>


    </div><p className="footer-note">Thank you for completing the quiz! We hope this helps you explore your career path.</p></>
    
  );
};

export default BasicResults;
