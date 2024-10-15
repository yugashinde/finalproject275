import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate("/");
  };

  return (
    <header>
      <button onClick={handleNavigateBack}>Back to Home</button>
    </header>
  );
};

export default Header;
