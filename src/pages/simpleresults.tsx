import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import './simplequestions';


const BasicResults: React.FC = () => {
  let c = localStorage.getItem("career");
  return (
      <div>
        <HeaderComponent />
        <h1>Basic Results</h1>
        <p>{c}</p>
        <p>Here is the basic result content.</p>
        </div>
  );
};

export default BasicResults;