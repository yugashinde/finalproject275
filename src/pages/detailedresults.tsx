import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import video from '../video/4782596-uhd_3840_2160_30fps.mp4';
import './detailedresults.css'
import './detailedquestions';
import { useLocation } from 'react-router-dom';

const DetailedResults: React.FC = () => {
  let c = localStorage.getItem("career");
  let pr = localStorage.getItem("p");
  let apik = localStorage.getItem("MYKEY");


  const location = useLocation();
  const { career } = location.state || {};

  return (
      <div className="detailedquestions">
        <video className="background-video" src={video} autoPlay loop muted playsInline />
        <div className="container"></div>
        <HeaderComponent />
        <h1>Detailed Quiz Results</h1>
        <p> {career}</p>
        
  
        </div>
  );
};

export default DetailedResults;
