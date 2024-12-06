import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import video from '../video/4782596-uhd_3840_2160_30fps.mp4';
import './detailedresults.css'
import './detailedquestions';
import { useLocation } from 'react-router-dom';

const DetailedResults: React.FC = () => {
  const location = useLocation();
  const { career } = location.state || {};

  const sections = career
  .split(/\d\)\s/)  // Split on the pattern of '1)', '2)', etc.
  .filter(Boolean);

  return (
      <div className="detailedquestions">
        <video className="background-video" src={video} autoPlay loop muted playsInline />
        <div className="container"></div>
        <HeaderComponent />
        <h1>Detailed Quiz Results</h1>
        
        <div className="career-section">
          <h4>Top Career Choice:</h4>
          <p>{sections[0].trim().replace("Top Career Choice:","" ) || 'Not provided'}</p>
        </div>

        <div className="career-section">
          <h4>Reason:</h4>
          <p>{sections[1].trim().replace("Reason:","" ) || 'Not provided'}</p>
        </div>

        <div className="career-section">
          <h4>Example of Job Title:</h4>
          <p>{sections[2].trim().replace("Example of Job Title:","" )|| 'Not provided'}</p>
        </div>

        <div className="career-section">
          <h4>Description of the Job Title:</h4>
          <p>{sections[3].trim().replace("Description of Job Title:","" ) || 'Not provided'}</p>
        </div>

        <p className="footer-note">Thank you for completing the quiz! We hope this helps you explore your career path.</p>
        </div>
  );
};

export default DetailedResults;
