import React from 'react';

import NavigateSimpleButton from '../components/NavigateSimpleButton';
import NavigateDetailedButton from '../components/NavigateDetailedButton';
import { Row, Col, Container } from 'react-bootstrap';
import './homepage.css'; 

const HomePage: React.FC = () => {
  return (
    <div className='homepage'>
      
   
      <h1 className='homepage-header'>WELCOME TO THE CAREER TEST</h1>
      <Container>
      <Row> <Col md={6}> <NavigateSimpleButton /> </Col>
      <Col md = {6}> <NavigateDetailedButton /> </Col> 
      </Row>
      </Container>
      
      
    </div>
  );  
};

export default HomePage;
