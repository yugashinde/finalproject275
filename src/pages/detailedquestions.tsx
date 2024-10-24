
import HeaderComponent from '../components/HeaderComponent'
import React, { useState } from 'react';
import { Question } from '../interfaces/Question';
import {Form} from 'react-bootstrap';




//took help from chat gpt to figure out how to store answers back into questions. I figured it would be easier later on when working with AI to be able to enter questions[] and have all answers right their organized with the questions
const DetailedQuestions: React.FC = () => {
  
const [questions, setQuestions] = useState<Question[]>([
   {id : 1, name : "Imagine you could teach a class on any skill or topic — what would it be, and what makes you the expert?", options: [], answer:""},
   {id : 2, name : "If you were cast in a role for a team-based adventure, what character would you naturally become, and how would you lead the group to success?s", options: [],answer:""},
   {id : 3, name : "You’re given the power to instantly learn a new skill — what would it be?",options: [],answer:""},
   {id : 4, name : "Describe your ideal workspace: what’s around you, and how does it help you stay in your creative flow?", options: [],answer:""},
   {id : 5, name : "If you could spend an entire day doing one activity without getting tired, what would it be, and why?",options: [],answer:""},
   {id : 6, name : "Imagine you’re on a deserted island with only one item of your choosing— what is it, and why did you select that tool?", options: [""], answer:""},
   {id : 7, name : "You’re given the chance to spend a week learning from any professional — who would it be, and what would you hope to gain from the experience?",options: [],answer:""},
])
const [currQIndex, setCurrQuestionIndex] = useState(0);


const updateAnswer = (input:number , value:string)=>{
   setQuestions(prevQuestions =>{
       const updatedQuestions = [...prevQuestions];
       updatedQuestions[currQIndex].answer = value;
       return updatedQuestions;
   })}


       return (
        <div>
          <HeaderComponent />
          <h1>Detailed Question</h1>
           <div>
               <Form>
                   {questions.map((question,index)=>(
                       <Form.Group key = {question.id}>
                           <label> Q{question.id} {question.name} </label>
                           <Form.Control


                           as = "textarea"
                           rows = {3}
                           value = {question.answer}
                           onChange = { (e) => updateAnswer(index, e.target.value)} />
                       </Form.Group>


                   ))}
              


               <button
               onClick={()=>setCurrQuestionIndex(prev => prev+1 % questions.length)}
               disabled = {currQIndex === questions.length-1}
               >
                   Submit
               </button>


               </Form>
           </div>
           </div>
       )


















}

export default DetailedQuestions;

