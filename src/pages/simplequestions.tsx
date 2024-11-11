
import HeaderComponent from '../components/HeaderComponent'
import React, { useState} from 'react';
import { Question } from '../interfaces/Question';
import {Form} from 'react-bootstrap';
import QuestionProgress from '../components/QuestionProgress';

import Feedback from '../components/feedback'
import './simplequestions.css';
import axios from 'axios';



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
    const [currQIndex, setCurrQuestionIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0);
    const [suggestedCareer, setSuggestedCareer] = useState<string|null>(null);

   const updateAnswer= (selectedAnswer : string)=>{
    setQuestions(prevQuestions => {
        const updatedQuestions = [...prevQuestions];
        if (updatedQuestions[currQIndex].answer === "") {
            setAnsweredQuestionsCount(prevCount => prevCount + 1);
        }
        updatedQuestions[currQIndex].answer = selectedAnswer;
        return updatedQuestions;
    });
    
    if (answeredQuestionsCount + 1 === questions.length) {
        setShowPopup(true);
    }
    }; 

   const question= questions[currQIndex];

   const handleNext = () => {
    if (currQIndex < questions.length - 1) {
      setCurrQuestionIndex(prev => prev + 1);
      setShowPopup(false);
    }
  };
  const handleSubmit =  async () => {
    const answers = questions.map(q => q.answer);
    const prompt = 'Based on following answers to the career quiz : 1. {questions[0].name} Answer: {answers[0]} 2. {questions[1].name} Answer : {answers[1]} 3. {questions[2].name} Answer : {answers[2]} 4. {questions[3].name} Answer : {answers[3]}  5. {questions[4].name} Answer : {answers[4]} 6. {questions[5].name} Answer : {answers[5]} 7. {questions[6].name} Answer : {answers[6]} Please suggest a career based on the given information'
    const apikey = localStorage.key
    try{
      const response = await axios.post('https://api.openai.com/v1/chat/completions',{ messages : [{role: 'system', content : 'you are a helpful career advisor that uses user answers to guide the user to a career best suited for them'}, {role: 'user', content : prompt},]},
        {
          headers: {
            'Authorization': `Bearer ${apikey}`,
            'Content-Type': 'application/json',
          }
        } 
    );

      setSuggestedCareer(response.data.choices[0].message.content);}
      catch(error){
        console.error("didnt connect", error);
      }
  };

   return (
        <div>
          <HeaderComponent />
          <QuestionProgress totalQuestions={7} progress={currQIndex} />
          <h1>Simple Question</h1>
          <Feedback totalQuestions={questions.length} answeredQuestions={answeredQuestionsCount} />
           <div>
               <h2>Q{question.id}  {question.name} </h2>
               
               <Form>
               {question.options.map((Option, index) => (
                       <div key = {index}>
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


               <button 
               disabled = {currQIndex !== questions.length-1} 
               onClick ={handleSubmit}>
                Submit </button>


               <button
               onClick={handleNext}
              disabled= {question.answer === "" && question.id === 7}
              style ={
                  { marginTop : 100,
                  marginBottom : 400,
                  backgroundColor : 'black',
                  color: 'white'
                }
              }   
              >
                   Next
               </button>
              
              </div>
           {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <p>You've completed all questions!</p>
                        <button onClick={() => setShowPopup(false)}>Okay</button>
                    </div>
                </div>
            )}

            {suggestedCareer && (
              <div className='career-suggestion formating'>
                <h3> Your suggested Career </h3>
                <p> {suggestedCareer} </p>
                </div>
            )}
           </div>
       );


       

};


export default SimpleQuestions;



