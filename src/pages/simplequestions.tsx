

  import HeaderComponent from '../components/HeaderComponent'
  import React, { useState, useEffect} from 'react';
  import { Question } from '../interfaces/Question';
  import {Form, Button} from 'react-bootstrap';
  import QuestionProgress from '../components/QuestionProgress';

  import Feedback from '../components/feedback'
  import './simplequestions.css';
  import { useNavigate } from 'react-router-dom';
  import video from '../video/4782596-uhd_3840_2160_30fps.mp4';
  import axios from 'axios';
  import loadingGif from '../video/809.gif';

  
  


    

  const SimpleQuestions: React.FC = () => {
    
  
    const navigate = useNavigate();
    
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
      const [suggestedCareer, setSuggestedCareer] = useState<string>("");
      const [nextPressedOnLastQuestion, setNextPressedOnLastQuestion] = useState(false);
      const [submitTriggered, setSubmitTriggered] = useState(false);
      const [error, setError] = useState<string>("");
      const [loading, setLoading] = useState<boolean>(false);
   
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
          setNextPressedOnLastQuestion(true);
      }
      }; 

    const question= questions[currQIndex];
    const handleNext = () => {

      if (currQIndex < questions.length - 1) {
        setCurrQuestionIndex(prev => prev + 1);
        setShowPopup(false);
      }
    };
  

    

    const handleSubmit =  async() => {
      // handles the axios post request and returns a formatted response to the user 
      const answers = questions.map(q => q.answer);
      const prompt = `Based on following answers to the career quiz : 1. ${questions[0].name} Answer: ${answers[0]} 2. ${questions[1].name} Answer : ${answers[1]} 3. ${questions[2].name} Answer : ${answers[2]} 4. ${questions[3].name} Answer : ${answers[3]}  5. ${questions[4].name} Answer : ${answers[4]} 6. ${questions[5].name} Answer : ${answers[5]} 7. ${questions[6].name} Answer : ${answers[6]} Please suggest top career choice.  give me a brief reason at to why this career suits the user.  give me one example of a job title this career might have. provide 1 sentence description about what the job entails `
      const _apikey = localStorage.getItem("MYKEY");
      let apikey = "";
      if (_apikey !== null) {
        apikey = JSON.parse(_apikey);
      }
      localStorage.setItem('p', prompt);
    
      // eslint-disable-next-line react-hooks/rules-of-hooks
      localStorage.setItem("career", suggestedCareer);

      try{
        setLoading(true);
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',  // Or another model, depending on your API configuration
            max_tokens: 200,    // Adjust as necessary for response length
            messages : [
              {role: 'system', content : 'you are a helpful career advisor that uses user answers to guide the user to a career best suited for them'},
              {role: 'user', content : prompt}
            ]
            
          },
          
          {
            headers: {
              'Authorization': `Bearer ${apikey}`,  // Authorization header with API key
              'Content-Type': 'application/json',   // Ensure the request content type is JSON
            },
            
          }
        );
        const detailedResponse = response.data.choices[0].message.content;
        console.log(detailedResponse); // Log full response for debugging
        return detailedResponse; // Return full detailed response
         
          } catch (error: any) {
            let errorMessage: string;
        
            // Handle various error cases
            if (error.response) {
              // When there is a response but an error status code
              errorMessage = `Error: ${
                error.response.data.error.message || "Unknown error"
              } (Status: ${error.response.status})`;
            } else if (error.request) {
              // When no response was received from the server
              errorMessage = "Error: No response received from the server.";
            } else {
              // For other errors (e.g., network issues or unexpected errors)
              errorMessage = `Error: ${error.message}`;
            }
        
            console.error("Error fetching career suggestion:", errorMessage);
            setError(errorMessage); // Update the error state to show the message to the user
            return null; // Return null to indicate failure
          } finally {
            setLoading(false); // End loading state
          }

    }
    const submitAndNavigate = async () => {
      //helper function : calls handleSubmit and navitage to simpleresults page 
      const detailedResponse = await handleSubmit();
      if (detailedResponse) {
        navigate('/simpleresults', { state: { detailedCareer: detailedResponse } });
      } else {
        console.error("Failed to fetch career suggestion. Please try again.");
      }
    };


         

    
  return (
          <div className="simplequestions"
          >
              <video className="background-video" src={video} autoPlay loop muted playsInline />
              <div className="container"></div>
            <HeaderComponent />
            <h1 className = "simple-header">Simple Question</h1>
            <QuestionProgress totalQuestions={questions.length} progress={answeredQuestionsCount} />
            <Feedback totalQuestions={questions.length} answeredQuestions={answeredQuestionsCount} />
             {/* Check if loading */}
    {loading ? (
      <div className="loading-container">
        <img src={loadingGif} alt="Loading..." />
        <p>Generating your career suggestions...</p>
      </div>
    ) : (
      <div>
        <h2>{question.name}</h2>

        <Form>
          {question.options.map((Option, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name={question.name}
                  value={Option}
                  checked={question.answer === Option}
                  onChange={() => updateAnswer(Option)}
                />
                {Option}
              </label>
            </div>
          ))}

          {question.answer && <p>Your answer has been recorded!</p>}
        </Form>

        <Button
          onClick={handleNext}
          disabled={
            question.answer === "" || (currQIndex === questions.length - 1 && nextPressedOnLastQuestion)
          }
          className="next-button"
          style={{
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: "black",
            color: "white",
            marginRight: "10px",
            border: "1px solid white",
            transition: "transform 0.3s ease",
            borderRadius: "10px",
            paddingTop: "4px",
            paddingBottom: "4px",
          }}
        >
          Next
        </Button>

        {nextPressedOnLastQuestion ? (
          <Button
            onClick={submitAndNavigate}
            className="submit-button"
            style={{
              marginTop: 20,
              marginBottom: 20,
              backgroundColor: "black",
              color: "white",
              marginRight: "10px",
              border: "1px solid white",
              transition: "transform 0.3s ease",
              borderRadius: "10px",
              paddingTop: "4px",
              paddingBottom: "4px",
            }}
          >
            Submit
          </Button>
        ) : (
          <Button
            className="submit-button"
            style={{
              marginTop: 20,
              marginBottom: 20,
              backgroundColor: "black",
              color: "white",
              marginRight: "10px",
              border: "1px solid white",
              transition: "transform 0.3s ease",
              borderRadius: "10px",
              paddingTop: "4px",
              paddingBottom: "4px",
            }}
            disabled
          >
            Submit
          </Button>
        )}

        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>
            <strong>{error}</strong>
          </div>
        )}
      </div>
    )}

    {showPopup && (
      <div className="popup-overlay">
        <div className="popup-box">
          <p>You've completed all questions!</p>
          <Button onClick={() => setShowPopup(false)}>Okay</Button>
        </div>
      </div>
    )}
  </div>
);
  };



  export default SimpleQuestions;