import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import HeaderComponent from '../components/HeaderComponent';
import QuestionProgress from '../components/QuestionProgress';
import Feedback from '../components/feedback';
import { Question } from '../interfaces/Question';
import './detailedquestions.css';
import { Link } from 'react-router-dom';
import video from '../video/4782596-uhd_3840_2160_30fps.mp4';



const DetailedQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, name: "Imagine you could teach a class on any skill or topic — what would it be, and what makes you the expert?", options: [], answer: "" },
    { id: 2, name: "If you were cast in a role for a team-based adventure, what character would you naturally become, and how would you lead the group to success?", options: [], answer: "" },
    { id: 3, name: "You’re given the power to instantly learn a new skill — what would it be?", options: [], answer: "" },
    { id: 4, name: "Describe your ideal workspace: what’s around you, and how does it help you stay in your creative flow?", options: [], answer: "" },
    { id: 5, name: "If you could spend an entire day doing one activity without getting tired, what would it be, and why?", options: [], answer: "" },
    { id: 6, name: "Imagine you’re on a deserted island with only one item of your choosing— what is it, and why did you select that tool?", options: [], answer: "" },
    { id: 7, name: "You’re given the chance to spend a week learning from any professional — who would it be, and what would you hope to gain from the experience?", options: [], answer: "" },
  ]);

  const [currQIndex, setCurrQIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0);
  const [nextPressedOnLastQuestion, setNextPressedOnLastQuestion] = useState(false);

  const handleNext = () => {
    if (questions[currQIndex].answer !== "") {
      setAnsweredQuestionsCount((prevCount) => prevCount + 1);
    }

    if (currQIndex === questions.length - 1) {
      setShowPopup(true);
      setNextPressedOnLastQuestion(true);
    } else {
      setCurrQIndex((prev) => prev + 1);
    }
  };

  const updateAnswer = (value: string) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[currQIndex].answer = value;
      return updatedQuestions;
    });
  };

  return (
    <div className="detailedquestions">
      <video className="background-video" src={video} autoPlay loop muted playsInline />
      <div className="container"></div>
      <HeaderComponent />
      <h1  className = "detailed-header">Detailed Question</h1>
      <QuestionProgress totalQuestions={questions.length} progress={answeredQuestionsCount} />
      <Feedback totalQuestions={questions.length} answeredQuestions={answeredQuestionsCount} />

      <Form>
        <Form.Group>
          <label>{questions[currQIndex].name}</label>
          <Form.Control
            as="textarea"
            rows={3}
            value={questions[currQIndex].answer}
            onChange={(e) => updateAnswer(e.target.value)}
            className="detailed-textarea"
            placeholder="Type your response here"
          />
        </Form.Group>
          <Button
            onClick={handleNext}
            disabled= {questions[currQIndex].answer === "" || (currQIndex === questions.length - 1 && nextPressedOnLastQuestion)}
            className="next-button"
                style= {
                    { marginTop : 20,
                    marginBottom : 20,
                    backgroundColor : 'black',
                    color: 'white',
                    marginRight: '10px',
                    border: '1px solid white',
                    transition: 'transform 0.3s ease',
                    borderRadius: '10px',
                    paddingTop:'4px',
                    paddingBottom: '4px',
                    } 
                }>
                Next
            </Button>
            {(nextPressedOnLastQuestion) ? (
            <Link to="/detailedresults">
                <Button className="submit-button"

                style={{ marginTop : 20,
                  marginBottom : 20,
                  backgroundColor : 'black',
                  color: 'white',
                  marginRight: '10px',
                  border: '1px solid white',
                  transition: 'transform 0.3s ease',
                  borderRadius: '10px',
                  paddingTop:'4px',
                  paddingBottom: '4px',}} 
                  >
                Submit
                </Button>
            </Link>
            ) : (
            <Button className="submit-button"

            style={{ marginTop : 20,
              marginBottom : 20,
              backgroundColor : 'black',
              color: 'white',
              marginRight: '10px',
              border: '1px solid white',
              transition: 'transform 0.3s ease',
              borderRadius: '10px',
              paddingTop:'4px',
              paddingBottom: '4px',}} disabled>
                Submit
            </Button>
            )}
        </Form>

      {showPopup && (
      <div className="popup-overlay">
        <div className="popup-box">
          <p>You've completed all questions!</p>
          <Button onClick={() => setShowPopup(false)}>Okay</Button>
        </div>
      </div>
      )}
      </div>
  );
};

export default DetailedQuestions;

