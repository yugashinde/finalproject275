//import React, {useState} from 'react';
//import {Question} from './Question';
//import { Link } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';
import Header from "./HeaderComponent";

import React from 'react';
const SimpleQuestions: React.FC = () => {
    // Your existing logic here
   // const [completed, setCompleted] = React.useState(false); // Add state for completion

    // Function to check if all questions are answered
   // const checkCompletion = () => {
        // Assuming you have a way to check if questions are completed
        // Set completed to true if all questions are answered
        // setCompleted(true); 
    //};

    // return (
    //     <div>
    //         <header>
    //             <h1>Simple Questions</h1>
    //             <BackButton />
    //         </header>
    //         {/* Your simple questions content here */}
    //         {completed && <p>You've completed all questions!</p>}
    //     </div>
    // );
    return (
        <div>
          <Header />
          <h2>Simple Question</h2>
          {/* Simple question content */}
        </div>
      );

};

export default SimpleQuestions;

//feedback mechanism, notifies users when they've completed
// all questions for basic career assesment
