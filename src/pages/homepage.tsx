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
      <h1 className='homepage-header'>WELCOME TO CAREERCOAST</h1>
      <div className = "homepage-description"> Welcome to CareerCoast, your serene pathway to career clarity. Just like the ocean’s waves reveal hidden treasures, our personalized assessments help uncover your unique strengths, guiding you toward a fulfilling career journey. Set sail with us as you explore new horizons, discover opportunities, and chart a course that aligns with your true potential. With CareerCoast, navigating your future is as refreshing as a day at the beach. </div>
      <Container>
      <Row> <Col md={6}> <NavigateSimpleButton /> </Col>
      <Col md = {6}> <NavigateDetailedButton /> </Col> 
      </Row>
      </Container>
      
      
    </div>
  );  
};

export default HomePage;
