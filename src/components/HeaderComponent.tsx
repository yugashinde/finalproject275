import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Header: React.FC = () => {
  return (
    <Link to="/">
      <Button className="custom-button">Home</Button>
    </Link>
  );
};

export default Header;
