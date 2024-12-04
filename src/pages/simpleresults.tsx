import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
<<<<<<< HEAD
import './simplequestions.css'; // Ensure correct file import
=======

import './simplequestions';
import { useLocation } from 'react-router-dom';

>>>>>>> b897eb9838b5db38063583480e5c7322bbf4b509
import video from '../video/4782596-uhd_3840_2160_30fps.mp4';
import './simpleresults.css'; // Ensure correct file import

const BasicResults: React.FC = () => {
<<<<<<< HEAD
  const careerSuggestion = localStorage.getItem("career");
if (!careerSuggestion || careerSuggestion === "No suggestion available.") {
  console.log("No career suggestion available or API failed.");
}
  //const promptDetails = localStorage.getItem("p") || "No prompt data available.";

  return (
    <div className="simplequestions">
      <video className="background-video" src={video} autoPlay loop muted playsInline />
      <div className="container"></div>
      <HeaderComponent />
      <div className="results-content">
        <h1 className="results-header">Basic Results</h1>
        
        <div className="results-box">
          <h2>Career Suggestion</h2>
          <p className="career-suggestion">{careerSuggestion}</p>
=======
  let c = localStorage.getItem("career");
  let pr = localStorage.getItem("p");
  let apik = localStorage.getItem("MYKEY");


  const location = useLocation();
  const { career } = location.state || {};

  return (
      <div className="simplequestions">
        <video className="background-video" src={video} autoPlay loop muted playsInline />
        <div className="container"></div>
        <HeaderComponent />

        

        
        <h1>Basic Quiz Results</h1>
        <p> {career}</p>
        
  
>>>>>>> b897eb9838b5db38063583480e5c7322bbf4b509
        </div>

        <p className="footer-note">Thank you for completing the quiz! We hope this helps you explore your career path.</p>
      </div>
    </div>
  );
};

export default BasicResults;
