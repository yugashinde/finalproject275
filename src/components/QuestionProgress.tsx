import React from 'react';
import { ProgressBar } from 'react-bootstrap';

interface QuestionProgressProps {
  totalQuestions: number;
  progress: number; 
}

const QuestionProgress: React.FC<QuestionProgressProps> = ({ totalQuestions, progress }) => {
  const progressPercentage = Math.min((progress / totalQuestions) * 100, 100);

  return (
    <div style={{ width: '100%', padding: '20px' }}>
      <ProgressBar now={progressPercentage} label={`${Math.round(progressPercentage)}%`} />
    </div>
  );
};

export default QuestionProgress;
