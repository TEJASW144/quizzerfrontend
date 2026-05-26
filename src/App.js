import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import WelcomePage from './pages/Welcomepage';
import CreateQuiz from './pages/createQuiz';
import Quiz from './pages/attemptQuiz';
import Contactus from './pages/contactus';
import QuizRoom from './pages/createGroup';
import AboutUs from './pages/aboutUs'; 


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/welcompage' element={<WelcomePage />} />
            <Route path='/create-quiz' element={<CreateQuiz />} />
            <Route path='/attemptquiz/:quizId' element={<Quiz />} />
            <Route path='/contactus' element={<Contactus />} />
            <Route path='/quizroom' element={<QuizRoom />} />
            
            {/* ADDED MISSING ROUTE CONFIGURATION */}
            <Route path='/aboutUs' element={<AboutUs />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
