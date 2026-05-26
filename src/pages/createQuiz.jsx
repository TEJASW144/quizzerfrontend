import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../design/createQuiz.module.css';

const QuizForm = () => {
    const [quizzes, setQuizzes] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
    const [quizname, setQuizName] = useState('');
    
    // NEW STATES FOR COOKING THE SUCCESS POPUP
    const [showModal, setShowModal] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');

    const handleNameChange = (e) => {
      setQuizName(e.target.value);
    }

    const handleOptionChange = (questionIndex, optionIndex, value) => {
      const updatedQuizzes = [...quizzes];
      updatedQuizzes[questionIndex].options[optionIndex] = value;
      setQuizzes(updatedQuizzes);
    };

    const handleAddQuestion = () => {
      setQuizzes([...quizzes, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
    };

    const navigate = useNavigate();
    
    const handleSaveQuiz = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post("https://quizzerbackend.onrender.com/addques", {
            quizname,
            quizzes,
          });
          console.log('Data sent successfully: ', response.data);

          // Extract unique mongo ID from your typical responses
          const targetId = response.data._id || response.data.quiz?._id || response.data.id;
          
          if (targetId) {
              setGeneratedCode(targetId);
              setShowModal(true); // 🎯 Pop open the beautiful modal instead of leaving!
          } else {
              navigate('/quizroom');
          }
      }
      catch (error){
          console.log('Failed to send data: ', error);
      }
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(generatedCode);
        alert("Quiz Code copied to clipboard!");
    };

    return (
      <div className={styles.pageWrapper}>
        <div className={styles.headingBanner}>
          APOLLO'S ORACLE
        </div>

        <div className={styles.formContainer}>
          <div className={styles.nameSection}>
            <label className={styles.metaLabel}>QUIZ TITLE</label>
            <input 
              type='text' 
              placeholder='Ex: Greek Mythology Core Trivia'
              value={quizname} 
              onChange={handleNameChange}
              className={styles.titleInput}
            />
          </div>

          <div className={styles.questionsList}>
            {quizzes.map((quiz, questionIndex) => (
              <div key={questionIndex} className={styles.questionCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.questionNumber}>Question {questionIndex + 1}</span>
                  <span className={styles.badgeLabel}>Required</span>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.fieldLabel}>Question Statement</label>
                  <input
                    type="text" 
                    placeholder='Enter your query statement here...'
                    value={quiz.question}
                    onChange={(e) => {
                      const updatedQuizzes = [...quizzes];
                      updatedQuizzes[questionIndex].question = e.target.value;
                      setQuizzes(updatedQuizzes);
                    }}
                    className={styles.styledInput}
                  />
                </div>

                <div className={styles.optionsSection}>
                  <label className={styles.fieldLabel}>Configure Response Options</label>
                  <div className={styles.optionsGrid}>
                    {quiz.options.map((option, optionIndex) => (
                      <div key={optionIndex} className={styles.optionInputRow}>
                        <span className={styles.optionPrefix}>{String.fromCharCode(65 + optionIndex)}</span>
                        <input
                          type="text" 
                          placeholder={`Option ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                          className={styles.styledInput}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.dropdownSection}>
                  <label className={styles.fieldLabel}>Designate Correct Key Answer</label>
                  <select 
                    value={quiz.correctAnswer} 
                    className={styles.styledSelect}
                    onChange={(e) => {
                      const updatedQuizzes = [...quizzes];
                      updatedQuizzes[questionIndex].correctAnswer = e.target.value;
                      setQuizzes(updatedQuizzes);
                    }}
                  >
                    <option value="" disabled>Select correct matching value from above</option>
                    {quiz.options.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option || `Empty Option ${String.fromCharCode(65 + optionIndex)}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actionFooter}>
            <button className={styles.addQuestionBtn} onClick={handleAddQuestion}>
              + Add New Card
            </button>
            <button 
              onClick={handleSaveQuiz} 
              className={styles.saveQuizBtn}
              disabled={!quizname.trim() || quizzes.some(q => !q.question.trim() || !q.correctAnswer)}
            >
              Compile & Save Quiz
            </button>
          </div>
        </div>

        {/* ================= SUCCESS MODAL LAYOUT ================= */}
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <div className={styles.modalIcon}>🎉</div>
              <h2 className={styles.modalTitle}>Quiz Compiled Successfully!</h2>
              <p className={styles.modalSubtitle}>Your terminal schema is active. Share this database key code with your players:</p>
              
              <div className={styles.codeDisplayBox}>
                <code className={styles.codeText}>{generatedCode}</code>
                <button onClick={handleCopyCode} className={styles.copyBtn}>
                  Copy Code
                </button>
              </div>

              <div className={styles.modalActionGroup}>
                <button onClick={() => navigate(`/attemptquiz/${generatedCode}`)} className={styles.launchBtn}>
                  Launch Quiz Screen
                </button>
                <button onClick={() => navigate('/welcompage')} className={styles.secondaryBtn}>
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default QuizForm;
