import React from "react";
import { useNavigate } from "react-router-dom";
import {Button} from 'react-bootstrap';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate("/");
  };

  return (
    
      <Button onClick={handleNavigateBack}>Back to Home</Button>
    
  );
};

export default Header;
