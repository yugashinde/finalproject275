import React, {useState} from 'react';

const Feedback:React.FC<{totalQuestions:number}>=({totalQuestions})=>{
    const[answeredQuestions, setAnsweredQuestions]=useState<number>(0);
    const[isComplete, setComplete]=useState<boolean>(false);

    const handleAnswerQuestion = () => {
        const newCount = answeredQuestions + 1;
        setAnsweredQuestions(newCount);

        if (newCount >= totalQuestions) {
            setComplete(true);
        }
    };
    const handleDoneClick = () => {
        setComplete(true);
    };
    return(
        <div>
            <h2>Quiz Progress</h2>
            <p>Questions answered: {answeredQuestions} / {totalQuestions}</p>
            <button onClick={handleAnswerQuestion} disabled={isComplete}>
                Answer Next Question
            </button>
            <button onClick={handleDoneClick} disabled={isComplete}>
                Done
            </button>

            {isComplete && (
                <div className="completion-feedback">
                    🎉 You've completed the quiz!
                </div>
            )}
        </div>

    )
}
export default Feedback;
