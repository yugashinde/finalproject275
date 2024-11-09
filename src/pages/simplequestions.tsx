import HeaderComponent from '../components/HeaderComponent'
import React, { useState} from 'react';
import { Question } from '../interfaces/Question';
import {Form, Button} from 'react-bootstrap';
import QuestionProgress from '../components/QuestionProgress';
import Feedback from '../components/feedback'
import './simplequestions.css';
import { Link } from 'react-router-dom';



const SimpleQuestions: React.FC = () => {


//took help from chat gpt to figure out how to store answers back into questions. I figured it would be easier later on when working with AI to be able to enter questions[] and have all answers right their organized with the questions
  
   const [questions, setQuestions] = useState<Question[]>([
       {id : 1, name : "I am very interested in creative outlets such as art, film, literature, etc", options: ['Not at all like me' , 'Not much like me', 'Neutral','Somewhat like me','Very much like me'],answer:""},
       {id : 2, name : "I am very interested in math and sciences", options: ['Not at all like me' , 'Not much like me', 'Neutral','Somewhat like me','Very much like me'],answer:""},
       {id : 3, name : "I enjoy interacting with new people every day.", options: ['Not at all like me' , 'Not much like me', 'Neutral','Somewhat like me','Very much like me'],answer:""},
       {id : 4, name : "I enjoy looking after children or taking care of people.", options: ['Not at all like me' , 'Not much like me', 'Neutral','Somewhat like me','Very much like me'],answer:""},
       {id : 5, name : "I enjoy hands-on and physical activities versus more sedentary work.", options: ['Not at all like me' , 'Not much like me', 'Neutral','Somewhat like me','Very much like me'],answer:""},
       {id : 6, name : "I enjoy public speaking.", options: ['Not at all like me' , 'Not much like me', 'Neutral','Somewhat like me','Very much like me'], answer:""},
       {id : 7, name : "I enjoy working alone.", options: ['Not at all like me' , 'Not much like me', 'Neutral','Somewhat like me','Very much like me'],answer:""},
   ]);
    const [currQIndex, setCurrQIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0);
    const [nextPressedOnLastQuestion, setNextPressedOnLastQuestion] = useState(false);

   const updateAnswer= (selectedAnswer : string)=>{
    setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[currQIndex].answer = selectedAnswer;
        return updatedQuestions;
      });
}; 

   const question = questions[currQIndex];

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


       return (
        <div>
          <HeaderComponent />
          <QuestionProgress totalQuestions={questions.length} progress={answeredQuestionsCount} />
          <h1>Simple Question</h1>
          <Feedback totalQuestions={questions.length} answeredQuestions={answeredQuestionsCount} />
           <div>
               <h2>Q{question.id}  {question.name} </h2>
               
               <Form>
               {question.options.map((Option, index) => (
                       <div key = {index} className="radio-buttons">
                           <label>
                               <input
                               type = "radio"
                               name = {question.name}
                               value = {Option}
                               checked={question.answer === Option}
                               onChange={()=> updateAnswer(Option)}
                               />
                               {Option}
                           </label>
                       </div>
                   ))}
                   {question.answer && <p> Your answer has been recorded! </p> }
               </Form>
               <Button
                onClick={handleNext}
                disabled= {question.answer === "" || (currQIndex === questions.length - 1 && nextPressedOnLastQuestion)}
                style= {
                    { marginTop : 20,
                    marginBottom : 20,
                    backgroundColor : 'black',
                    color: 'white',
                    marginRight: '10px'
                    }
                }>
                   Next
               </Button>
            {(nextPressedOnLastQuestion) ? (
            <Link to="/detailedresults">
                <Button style={{ backgroundColor: 'black', color: 'white' }}>
                Submit
                </Button>
            </Link>
            ) : (
            <Button style={{ backgroundColor: 'black', color: 'white' }} disabled>
                Submit
            </Button>
            )}
           </div>
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


export default SimpleQuestions;



