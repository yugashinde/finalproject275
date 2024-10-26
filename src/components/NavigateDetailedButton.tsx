import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './NavigateDetailedButton.css';

const NavigateDetailedButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/detailedquestions');
  };

  return (<div className="NavigateDetailedButton"> 
  <h2>Detailed Questions Quiz</h2>
    <div className = "text-box">
      <p>The detailed career assessment will assess your skills, interests, and preferences with a more nuanced and exploratory approach through a series of creative open-ended questions. By encouraging introspection and creative thinking, this type of test provides deeper insights into your unique talents, passions, and long-term professional goals, offering more personalized career recommendations based on your distinct characteristics.
      </p>
    <Button 
    style ={{backgroundColor: 'black'}}
    onClick={handleClick}>
      Detailed Questions Page
    </Button>
    </div>

    </div>)
  
};

export default NavigateDetailedButton;