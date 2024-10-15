import React, {useState} from 'react';
import {Question} from './Question';

//feedback mechanism, notifies users when they've completed
// all questions for basic career assesment

const BasicQuestions = ({questions}:{questions: Question[]})=>{
    const[questionsAnswered, setQuestionsAnswered] = useState<number[]>([]);
    
    //handles questions answered
    const handleAnswer = (questionId:number)=>{
        if(!questionsAnswered.includes(questionId)) {
            setQuestionsAnswered((prev)=>[...prev, questionId]);
        }
    };
    //checks if all questions are answered
    const allQuestionsAnswered = questionsAnswered.length === questions.length;
   
    return(
        <div>
            <h1> Basic Career Assesment</h1>
            {questions.map((question)=>(
                <div key ={question.id}>
                    <p>{question.body}</p>
                    <button onClick={()=>handleAnswer(question.id)}>Answer</button>
                </div>
            ))}
            {allQuestionsAnswered && (
                <div>
                    <p>You've completed all the questions.</p>
                </div>

            )}
        </div>
    )
   
};
export default BasicQuestions;




