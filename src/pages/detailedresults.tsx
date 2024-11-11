import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import './detailedresults.css'

const DetailedResults: React.FC = () => {
  return (
    <div>
      <HeaderComponent />
      <h1 className = "results-header">Detailed Results</h1>
      <p>Here is the detailed result content.</p>
    </div>
  );
};

export default DetailedResults;
