import React from 'react';

import NavigateSimpleButton from '../components/NavigateSimpleButton';
import NavigateDetailedButton from '../components/NavigateDetailedButton';
import { Row, Col, Container } from 'react-bootstrap';
import './homepage.css';
import video from '../video/4782596-uhd_3840_2160_30fps.mp4';



const HomePage: React.FC = () => {
  return (
    <div className='homepage'>
      <video className="background-video" src={video} autoPlay loop muted playsInline />
      <div className="container"></div>
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
