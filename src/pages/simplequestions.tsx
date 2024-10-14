import React, {useState} from 'react';
import {Question} from './Question';

//feedback mechanism, notifies users when they've completed
// all questions for basic career assesment

const basicQuestions = ({questions}:{questions: Question[]})=>{
    const[questionsAnswered, setQuestionsAnswered] = useState<number[]>([]);
    
    //handles questions answered
    const handleAnswer = (questionId:number)=>{
        if(!questionsAnswered.includes(questionId)) {
            setQuestionsAnswered((prev)=>[...prev, questionId]);
        }
    };
    //checks if all questions are answered
    const allQuestionsAnswered = questionsAnswered.length === questions.length;

   
};




