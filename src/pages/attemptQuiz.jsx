import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // 🎯 Added hook injection
import styles from '../design/Quiz.module.css';

const Quiz = () => {
  // Grab the dynamic parameter variable from the address bar link structure
  const { quizId: urlQuizId } = useParams(); 
  
  const [quizId, setQuizId] = useState(urlQuizId || '');
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [quizFetched, setQuizFetched] = useState(false);

  // AUTO-FETCH SCRIPT: If an ID is present in the link, load it instantly!
  useEffect(() => {
    if (urlQuizId) {
      handleQuizFetch(urlQuizId);
    }
  }, [urlQuizId]);

  const handleQuizIdChange = (e) => {
    setQuizId(e.target.value);
  };

  // Adjusted to accept direct string targets safely
  const handleQuizFetch = async (targetId = quizId) => {
    if (!targetId) return;
    try {
      const response = await axios.get(`https://quizzerbackend.onrender.com/quiz/${targetId}`);
      setQuiz(response.data);
      setScore(null); 
      setQuizFetched(true);
    } catch (error) {
      console.error('Error fetching quiz parameters:', error);
      setQuizFetched(false);
    }
  };

  const handleOptionSelect = (questionIndex, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.quiz.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers += 1;
      }
    });
    return correctAnswers;
  };

  useEffect(() => {
    if (!urlQuizId) {
      setQuiz(null);
      setUserAnswers({});
      setScore(null);
      setQuizFetched(false);
    }
  }, [quizId, urlQuizId]);

  useEffect(() => {
    if (quiz && currentQuestionIndex === quiz.quiz.length) {
      const userScore = calculateScore();
      setScore(userScore);
    }
  }, [currentQuestionIndex, quiz]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.quizCardContainer}>
        
        {/* Fallback Input Panel: Only displays if no code was attached to the URL link */}
        {!quizFetched && (
          <div className={styles.fetchSection}>
            <div className={styles.iconHeader}>🧠</div>
            <h2 className={styles.mainTitle}>Access Quiz Terminal</h2>
            <p className={styles.subtitleText}>Enter your target room string database key to sync parameters</p>
            
            <div className={styles.inputContainer}>
              <label className={styles.fieldLabel}>Quiz Code (ObjectId)</label>
              <input
                type="text"
                placeholder="Ex. 64f1bc..."
                value={quizId}
                onChange={handleQuizIdChange}
                className={styles.styledInput}
              />
            </div>
            <button onClick={() => handleQuizFetch()} className={styles.primaryButton}>
              Fetch Quiz Terminal
            </button>
          </div>
        )}

        {/* Live Quiz Rendering Core Nodes */}
        {quiz && (
          <div className={styles.liveQuizSection}>
            <header className={styles.quizHeader}>
              <h3 className={styles.quizName}>{quiz.name}</h3>
              {currentQuestionIndex < quiz.quiz.length && (
                <div className={styles.progressCounter}>
                  Question <span>{currentQuestionIndex + 1}</span> of {quiz.quiz.length}
                </div>
              )}
            </header>

            {currentQuestionIndex < quiz.quiz.length ? (
              <div className={styles.questionPanel}>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ width: `${((currentQuestionIndex + 1) / quiz.quiz.length) * 100}%` }}
                  />
                </div>
                
                <h2 className={styles.questionText}>
                  {quiz.quiz[currentQuestionIndex].question}
                </h2>
                
                <div className={styles.optionsContainer}>
                  {quiz.quiz[currentQuestionIndex].options.map((option, optionIndex) => {
                    const isSelected = userAnswers[currentQuestionIndex] === option;
                    return (
                      <div 
                        key={optionIndex} 
                        className={`${styles.optionRow} ${isSelected ? styles.activeOptionRow : ''}`}
                        onClick={() => handleOptionSelect(currentQuestionIndex, option)}
                      >
                        <div className={styles.radioControl}>
                          <input
                            type="radio"
                            name={`question${currentQuestionIndex}`}
                            value={option}
                            checked={isSelected}
                            onChange={() => handleOptionSelect(currentQuestionIndex, option)}
                            className={styles.hiddenRadio}
                          />
                          <span className={`${styles.customRadio} ${isSelected ? styles.customRadioChecked : ''}`} />
                        </div>
                        <span className={styles.optionText}>{option}</span>
                      </div>
                    );
                  })}
                </div>
                
                <button 
                  onClick={handleNextQuestion} 
                  className={styles.nextButton}
                  disabled={!userAnswers[currentQuestionIndex]}
                >
                  {currentQuestionIndex === quiz.quiz.length - 1 ? 'Finish Quiz' : 'Next Question →'}
                </button>
              </div>
            ) : (
              <div className={styles.resultsPanel}>
                <div className={styles.trophyIcon}>🏆</div>
                <h2 className={styles.resultsTitle}>Evaluation Finalized</h2>
                
                <div className={styles.scoreContainer}>
                  <div className={styles.scoreCircle}>
                    <span className={styles.actualScore}>{score}</span>
                    <span className={styles.scoreDivider}>/</span>
                    <span className={styles.totalScore}>{quiz.quiz.length}</span>
                  </div>
                  <p className={styles.scoreMetric}>Correct Answers Secured</p>
                </div>

                {/* Real-World Bonus: Shareable link field displayed at review stage */}
                <div className={styles.shareContainer} style={{margin: '24px 0', padding: '16px', background: '#0f172a', borderRadius: '8px', border: '1px dashed #334155'}}>
                   <p style={{fontSize: '12px', color: '#94a3b8', margin: '0 0 8px 0', fontWeight: '600'}}>🔗 SHARE THIS QUIZ WITH FRIENDS:</p>
                   <input 
                     type="text" 
                     readOnly 
                     value={window.location.href} 
                     onClick={(e) => { e.target.select(); document.execCommand('copy'); alert('Link copied to clipboard!'); }}
                     style={{width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#22c55e', padding: '8px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', textAlign: 'center'}}
                   />
                </div>

                <div className={styles.reviewList}>
                  <h4 className={styles.reviewHeader}>Answer Submission Logs</h4>
                  {quiz.quiz.map((question, index) => (
                    <div key={index} className={styles.reviewItem}>
                      <p className={styles.reviewQuestion}>{index + 1}. {question.question}</p>
                      <p className={styles.reviewUserAnswer}>
                        Your Selection: <span>{userAnswers[index] || "Skipped"}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
