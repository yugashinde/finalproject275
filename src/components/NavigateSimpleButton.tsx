import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const NavigateSimpleButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/simplequestions');
  };

  return (
    <div className = "text-box">
      <p>The basic career assessment will assess your skills, interests, and preferences by presenting a series of straightforward questions with predefined answer options. Based on the selected answers, the test will provide recommendations for career paths that align with your strengths. The basic assessment is easy to complete, offering a quick overview of potential career matches without requiring in-depth analysis.
      </p>
    <Button onClick={handleClick}>
      Simple Questions Page
    </Button>
    </div>
  );
};

export default NavigateSimpleButton;