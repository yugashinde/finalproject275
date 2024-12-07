import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import DetailedQuestions from './pages/detailedquestions';
import SimpleQuestions from './pages/simplequestions';
import SimpleResults from './pages/simpleresults';
import DetailedResults from './pages/detailedresults';
import HomePage from './pages/homepage';




//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}



function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }
  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }



  return (


    <div className="App">

          <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/simplequestions" element={<SimpleQuestions />} />
          <Route path="/detailedquestions" element={<DetailedQuestions />} />
          <Route path="/detailedresults" element={<DetailedResults />} />
          <Route path="/simpleresults" element={<SimpleResults />} />
        </Routes>
    </Router>

    <div className="footer">
      
      <div className="footer-socials">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png" alt="Facebook" className="social-icon" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="social-icon" />
        </a>
        
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube" className="social-icon" />
          </a>
      </div>
      <div className="api-key">
        <Form>
          <Form.Label>API Key:</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey} className="api-key-input"  ></Form.Control>
          <br></br>
          <Button className="APISubmit-Button" onClick={handleSubmit}>Submit</Button>
        </Form>
      </div>
      <div className = "follow-us">
        <p>Follow us</p>
      </div>
    </div>
    
    </div>
    </div>
  );

}

export default App;
