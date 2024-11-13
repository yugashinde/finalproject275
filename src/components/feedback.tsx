import React from 'react';

const Feedback: React.FC<{ totalQuestions: number; answeredQuestions: number }> = ({ totalQuestions, answeredQuestions }) => {
    const isComplete = answeredQuestions >= totalQuestions;

    return (
        <div>
            <p>Questions answered: {answeredQuestions} / {totalQuestions}</p>
            {isComplete && (
                <div className="completion-feedback">
                 🐚 You've completed all questions! 🐚
                </div>
            )}
        </div>
    );
};

export default Feedback;

