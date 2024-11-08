import React from 'react';

import NavigateSimpleButton from '../components/NavigateSimpleButton';
import NavigateDetailedButton from '../components/NavigateDetailedButton';
import { Row, Col, Container } from 'react-bootstrap';
import './homepage.css';
import video from '../video/855633-hd_1920_1080_25fps.mp4';


const HomePage: React.FC = () => {
  return (
    <div className='homepage'>
      <video className="background-video" src={video} autoPlay loop muted playsInline />
      <h1 className='homepage-header'>WELCOME TO THE CAREER TEST</h1>
      <div className="container"></div>
      <Container>
      <Row> <Col md={6}> <NavigateSimpleButton /> </Col>
      <Col md = {6}> <NavigateDetailedButton /> </Col> 
      </Row>
      </Container>
      
      
    </div>
  );  
};

export default HomePage;
