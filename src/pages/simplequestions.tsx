
import HeaderComponent from '../components/HeaderComponent'
import React, { useState } from 'react';
import { Question } from '../interfaces/Question';
import {Form} from 'react-bootstrap';


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
   ])
    const [currQIndex, setCurrQuestionIndex] = useState(0);


   const updateAnswer= (selectedAnswer : string)=>{
       setQuestions(prevQuestions =>{
           const updatedQuestions = [...prevQuestions];
           updatedQuestions[currQIndex].answer = selectedAnswer;
           return updatedQuestions;
       })
   }
   //
   const question= questions[currQIndex];
   const handleNext = () => {
    if (currQIndex < questions.length - 1) {
      setCurrQuestionIndex(prev => prev + 1);
    }
  };
       return (

        <div>
          <HeaderComponent />
          <h1>Simple Question</h1>
        
           <div>
               <h2>Q{question.id}  {question.name} </h2>
              
               <Form>
                   {question.options.map((Option,index) => (
                       <div key = {index}>
                           <label>
                               <input
                               type = "radio"
                               name = {question.name}
                               value = {Option}
                               checked = {question.answer === Option}
                               onChange={()=> updateAnswer(Option)}
                               />
                               {Option}
                           </label>
                       </div>
                   ))}
               </Form>


               <button
               onClick={handleNext}
               disabled={currQIndex === questions.length - 1}
               >
                   Next
               </button>
           </div>
           </div>
       )
  
}

export default SimpleQuestions;



