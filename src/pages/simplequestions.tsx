/* eslint-disable no-template-curly-in-string */

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

   const question = questions[currQIndex];

   const handleNext = () => {
    if (currQIndex < questions.length - 1) {
      setCurrQuestionIndex(prev => prev + 1);
      setShowPopup(false);
    }
  };
  

  const [loading, setLoading] = useState(false);

  
  const handleSubmit =   () => {
    setLoading(true);
    
    const apiKey = localStorage.getItem("MYKEY");
    
    console.log("API Key:", apiKey);
    if (!apiKey)
    {
      console.log("---------Api key not set correctly");
      setSuggestedCareer("API KEY ERROR RE-ENTER YOUR API KEY");
      return;
    }
    const prompt = "Given the answers to this career quiz suggest a career\n" + questions.map((q, index) => {
      return `${index + 1}. ${q.name} Answer: ${q.answer}`;
    }).join("\n");
  

    axios.post( 
        "https://api.openai.com/v1/chat/completions", 
        {
          model: "gpt-3.5-turbo",  // Make sure to specify a valid model, such as GPT-3.5 or GPT-4
          
          messages: [
            { role: "system", content: "You are a helpful career advisor that gives a career suitable for user based on there answers to the quiz." },
            { role: "user", content : prompt },
          ],
        },
        {
          timeout : 100000,
          params: {
            userId : 12344
          },
          headers : {
            Authorization : `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          }
        },).then((response)=>{
          console.log("here");
          setSuggestedCareer(response.data.choices[0].message.content);
        })
        .catch((error) => {
          
          console.error("errorrr ::::::::::::", error);
          setSuggestedCareer(`Error: ${error.message || "An unexpected error occurred."}`);
        }).finally(
          ()=>{setLoading(false)}
        );  
    
  }
  


  

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
               disabled = { answeredQuestionsCount !== questions.length} 
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
                <p>your answers are loading{loading}</p>
                <p> {suggestedCareer}</p>
                </div>
            )}
           </div>
           
       );


       

};


export default SimpleQuestions;



