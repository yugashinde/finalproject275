import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import './simplequestions.css'; // Ensure correct file import
import video from '../video/4782596-uhd_3840_2160_30fps.mp4';
import './simpleresults.css'; // Ensure correct file import

const BasicResults: React.FC = () => {
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
        </div>

        <p className="footer-note">Thank you for completing the quiz! We hope this helps you explore your career path.</p>
      </div>
    </div>
  );
};

export default BasicResults;
