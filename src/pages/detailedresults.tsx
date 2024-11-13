import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import video from '../video/4782596-uhd_3840_2160_30fps.mp4';

const DetailedResults: React.FC = () => {
  return (
    <div className="detailedquestions">
      <video className="background-video" src={video} autoPlay loop muted playsInline />
      <div className="container"></div>
      <HeaderComponent />
      <h1>Detailed Results</h1>
      <p>Here is the detailed result content.</p>
    </div>
  );
};

export default DetailedResults;
