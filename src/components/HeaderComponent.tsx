import React from "react";
import { useNavigate } from "react-router-dom";
import {Button} from 'react-bootstrap';
import '../buttonStyles.css';


const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate("/");
  };

  return (
    
      <Button onClick={handleNavigateBack} className="custom-button">Home</Button>
    
  );
};

export default Header;
