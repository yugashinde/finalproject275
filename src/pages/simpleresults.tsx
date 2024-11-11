import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import './simpleresults.css'

const BasicResults: React.FC = () => {
  return (
      <div>
        <HeaderComponent />
        <h1 className = "results-header">Basic Results</h1>
        <p>Here is the basic result content.</p>
        </div>
  );
};

export default BasicResults;