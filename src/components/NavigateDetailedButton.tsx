import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const NavigateDetailedButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/detailedquestions');
  };

  return (
    <Button onClick={handleClick}>
      Detailed Questions Page
    </Button>
  );
};

export default NavigateDetailedButton;