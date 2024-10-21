import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const NavigateDetailedButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/detailedquestions');
  };

  return (
    <div className = "text-box">
      <p>The detailed career assessment will assess your skills, interests, and preferences with a more nuanced and exploratory approach through a series of creative open-ended questions. By encouraging introspection and creative thinking, this type of test provides deeper insights into your unique talents, passions, and long-term professional goals, offering more personalized career recommendations based on your distinct characteristics.
      </p>
    <Button onClick={handleClick}>
      Detailed Questions Page
    </Button>
    </div>
  );
};

export default NavigateDetailedButton;