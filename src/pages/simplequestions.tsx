
/* eslint-disable no-ex-assign */

  import HeaderComponent from '../components/HeaderComponent'
  import React, { useState} from 'react';
  import { Question } from '../interfaces/Question';
  import {Form, Button} from 'react-bootstrap';
  import QuestionProgress from '../components/QuestionProgress';

  import Feedback from '../components/feedback'
  import './simplequestions.css';
  import { useNavigate } from 'react-router-dom';
  import video from '../video/4782596-uhd_3840_2160_30fps.mp4';
  import axios from 'axios';
  



const SimpleQuestions: React.FC = () => {
    
//took help from chat gpt to figure out how to store answers back into questions. I figured it would be easier later on when working with AI to be able to enter questions[] and have all answers right their organized with the questions

  
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
      const [error, setError] = useState<string>("");
      
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
  

    

    const handleSubmit =  async () => {


      // eslint-disable-next-line react-hooks/rules-of-hooks
     
     
      const answers = questions.map(q => q.answer);
      const prompt = `Based on following answers to the career quiz : 1. ${questions[0].name} Answer: ${answers[0]} 2. ${questions[1].name} Answer : ${answers[1]} 3. ${questions[2].name} Answer : ${answers[2]} 4. ${questions[3].name} Answer : ${answers[3]}  5. ${questions[4].name} Answer : ${answers[4]} 6. ${questions[5].name} Answer : ${answers[5]} 7. ${questions[6].name} Answer : ${answers[6]} Please suggest a career based on the given information`
      const apikey = localStorage.getItem("MYKEY");
      localStorage.setItem('p', prompt);
     
      // eslint-disable-next-line react-hooks/rules-of-hooks
     
      try{
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
         
          {
            model : "gpt-4o",
            stream_options: {"include_usage": true},
            messages : [{role: 'system', content : 'you are a helpful career advisor that uses user answers to guide the user to a career best suited for them'},
            {role: 'user', content : prompt}]
           
            },
          {
            headers: {
              Authorization: `Bearer ${apikey}`,
              'Content-Type'  : 'application/json',
            },
            timeout : 50000
          });
         
          const suggestedCareer = response.data.choices[0].message.content;
          console.log('AI suggested career: ' + suggestedCareer);
          setSuggestedCareer(suggestedCareer);
          if(suggestedCareer !== ""){
            localStorage.setItem("career", suggestedCareer);
           
          }
          else{
            localStorage.setItem("career", "blank for now");
          }
         
 
 
        } catch (error:any) {
          let errorMessage: string;
 
 
  // Capture error details
 if (error.response) {
    // When there is a response but an error status code
    errorMessage = `Error: ${error.response.data.error.message} (Status: ${error.response.status})`;
  } else if (error.request) {
    // When no response was received from the server
    errorMessage = 'Error: No response received from the server.';
  } else {
    // For other errors (e.g., network issues or unexpected errors)
    errorMessage = `Error: ${error.message}`;
  }
      console.log('Error fetching career suggestion', errorMessage);
      setError(errorMessage);
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
            <div>
                <h2>{question.name}</h2>
                
                <Form>
                {question.options.map((Option, index) => (
                        <div key = {index}>
                            <label>
                                <input
                                type = "radio"
                                name = {question.name}
                                value = {Option}
                                checked={question.answer === Option}
                                onChange={()=> updateAnswer(Option)}
                                />
                                {Option}
                            </label>
                        </div>

                    ))}
                      
                    {question.answer && <p> Your answer has been recorded! </p> }
                    
                </Form>
                
                
                <Button
                  onClick={handleNext}
                  disabled= {question.answer === "" || (currQIndex === questions.length - 1 && nextPressedOnLastQuestion)}
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
                  onClick={async (e) => {
                    //e.preventDefault(); // Prevent default Link behavior
                    await handleSubmit(); // Wait for the career suggestion to be fetched
                    navigate('/simpleresults', { state:  "suggestedCareer is not found yet"  }); // Navigate using React Router
                  }}
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
            </div>
            {showPopup && (
                  <div className="popup-overlay">
                      <div className="popup-box">
                          <p>You've completed all questions!</p>
                          <Button  onClick={() => setShowPopup(false)}>Okay</Button>
                      </div>
                  </div>
              )}

            
            </div>
        );


        

  };


  export default SimpleQuestions;

