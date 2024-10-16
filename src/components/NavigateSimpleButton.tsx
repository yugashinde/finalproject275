import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const NavigateSimpleButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/simplequestions');
  };

  return (
    <Button onClick={handleClick}>
      Simple Questions Page
    </Button>
  );
};

export default NavigateSimpleButton;