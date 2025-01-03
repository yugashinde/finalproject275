import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import HeaderComponent from '../components/HeaderComponent';
import QuestionProgress from '../components/QuestionProgress';
import Feedback from '../components/feedback';
import { Question } from '../interfaces/Question';
import './detailedquestions.css';
import video from '../video/4782596-uhd_3840_2160_30fps.mp4';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loadingGif from '../video/809.gif';

const DetailedQuestions: React.FC = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, name: "What activities or subjects have always captured your interest, and why?", options: [], answer: "" },
    { id: 2, name: "If you were cast in a role for a team-based adventure, what character would you naturally become, and how would you lead the group to success?", options: [], answer: "" },
    { id: 3, name: "You’re given the power to instantly learn a new skill — what would it be?", options: [], answer: "" },
    { id: 4, name: "Describe your ideal workspace: what’s around you, and how does it help you stay in your creative flow?", options: [], answer: "" },
    { id: 5, name: "What aspects of a job are most important to you: salary, flexibility, creativity, stability, or impact?", options: [], answer: "" },
    { id: 6, name: "Imagine you’re on a deserted island with only one item of your choosing— what is it, and why did you select that tool?", options: [], answer: "" },
    { id: 7, name: "How do you define meaningful work?", options: [], answer: "" },
  ]);
 
  const [loading, setLoading] = useState<boolean>(false);
  const [currQIndex, setCurrQIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0);
  const [nextPressedOnLastQuestion, setNextPressedOnLastQuestion] = useState(false);
  const [error, setError] = useState<string>("");

  const handleNext = () => {
    if (questions[currQIndex].answer !== "") {
      setAnsweredQuestionsCount((prevCount) => prevCount + 1);
    }

    if (currQIndex === questions.length - 1) {
      setShowPopup(true);
      setNextPressedOnLastQuestion(true);
    } else {
      setCurrQIndex((prev) => prev + 1);
    }
  };

  const updateAnswer = (value: string) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[currQIndex].answer = value;
      return updatedQuestions;
    });
  };

  const handleSubmit =  async() => {
    // handles the axios post request and returns a formatted response to the user 
    const answers = questions.map(q => q.answer);
    const prompt = `Based on following answers to the career quiz : 1. ${questions[0].name} Answer: ${answers[0]} 2. ${questions[1].name} Answer : ${answers[1]} 3. ${questions[2].name} Answer : ${answers[2]} 4. ${questions[3].name} Answer : ${answers[3]}  5. ${questions[4].name} Answer : ${answers[4]} 6. ${questions[5].name} Answer : ${answers[5]} 7. ${questions[6].name} Answer : ${answers[6]}  Please suggest a career. The response should have 4 sections.  1)Top Career Choice,  2)Reason ( give me a brief reason at to why this career suits the user),  3)Example of Job Title in the top career choice , 4)description of the job title above `
    const _apikey = localStorage.getItem("MYKEY");
    let apikey = "";
    if (_apikey !== null) {
      apikey = JSON.parse(_apikey);
    }
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
      const detailedCareer = response.data.choices[0].message.content; 
      if(detailedCareer.includes("Career Choice") && detailedCareer.includes("Reason") && detailedCareer.includes("Job Title") && detailedCareer.includes("Description")){
        console.log(detailedCareer); // Log full response for debugging
        return detailedCareer;
      }
      else{
         return "Try Again! Error getting data from OpenAI";
      } 
       
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
    //helper function : calls handleSubmit and navitage to detailedresults page 
    const career = await handleSubmit();
    if (career) {
      navigate('/detailedresults', { state: { career: career } });
    } else {
      console.error("Failed to fetch career suggestion. Please try again.");
    }
  };

  return (
    <div className="detailedquestions">
      <video className="background-video" src={video} autoPlay loop muted playsInline />
      <div className="container"></div>
      <HeaderComponent />
      <h1  className = "detailed-header">Detailed Assessment</h1>
      <QuestionProgress totalQuestions={questions.length} progress={answeredQuestionsCount} />
      <Feedback totalQuestions={questions.length} answeredQuestions={answeredQuestionsCount} />
       {/* Check if loading */}
      {loading ? (
      <div className="loading-container">
        <img src={loadingGif} alt="Loading..." />
        <p>Generating your career suggestions...</p>
      </div>
    ) : (
      <Form>
        <Form.Group>
          <h4>{questions[currQIndex].name}</h4>
          <Form.Control
            as="textarea"
            rows={3}
            value={questions[currQIndex].answer}
            onChange={(e) => updateAnswer(e.target.value)}
            className="detailed-textarea"
            placeholder="Type your response here"
          />
        </Form.Group>
          <Button
            onClick={handleNext}
            disabled= {questions[currQIndex].answer === "" || (currQIndex === questions.length - 1 && nextPressedOnLastQuestion)}
            className="next-button"
                style= {
                    { marginTop : 20,
                    marginBottom : 20,
                    backgroundColor : 'black',
                    color: 'white',
                    marginRight: '10px',
                    border: '1px solid white',
                    transition: 'transform 0.3s ease',
                    borderRadius: '10px',
                    paddingTop:'4px',
                    paddingBottom: '4px',
                    } 
                }>
                Next
            </Button>
            {(nextPressedOnLastQuestion) ? (
                  <Button 
                  onClick={submitAndNavigate}
                  className="submit-button"

                  style={{ marginTop : 20,
                      marginBottom : 20,
                      backgroundColor : 'black',
                      color: 'white',
                      marginRight: '10px',
                      border: '1px solid white',
                      transition: 'transform 0.3s ease',
                      borderRadius: '10px',
                      paddingTop:'4px',
                      paddingBottom: '4px',}}
                  >
                  Submit
                  </Button>
              ) : (
              <Button 
              
              className="submit-button"
              style= {
                  { marginTop : 20,
                      marginBottom : 20,
                      backgroundColor : 'black',
                      color: 'white',
                      marginRight: '10px',
                      border: '1px solid white',
                      transition: 'transform 0.3s ease',
                      borderRadius: '10px',
                      paddingTop:'4px',
                      paddingBottom: '4px',}
              } disabled>
                  Submit
              </Button>
              )}
        </Form>

      )}
        {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <strong>{error}</strong>
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

export default DetailedQuestions;

