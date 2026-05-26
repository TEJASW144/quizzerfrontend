import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import AttemptQuiz from './attemptQuiz'; 
import styles from '../design/QuizRoom.module.css';

// Initialize socket outside the component loop to prevent disconnection cycles
const socket = io('http://localhost:8080');

const QuizRoom = () => {
  const [roomId, setRoomId] = useState('');
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [quizFetched, setQuizFetched] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [startQuiz, setStartQuiz] = useState(false);

  useEffect(() => {
    // Listen for room code assignment
    socket.on('roomCreated', (generatedRoomId) => {
      console.log("Lobby Sync Successful! ID:", generatedRoomId);
      setRoomId(generatedRoomId); 
    });

    socket.on('quizData', (quizData) => {
      setQuiz(quizData);
      setQuizFetched(true);
    });

    return () => {
      socket.off('roomCreated');
      socket.off('quizData');
    };
  }, []);

  const handleCreateRoom = () => {
    socket.emit('createRoom');
    setJoinedRoom(true);
  };

  const handleJoinRoom = () => {
    if (roomId.trim() !== '') {
      socket.emit('joinRoom', roomId);
      setJoinedRoom(true);
    }
  };

  const handleStartQuiz = () => {
    socket.emit('fetchQuiz', roomId);
    setStartQuiz(true);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.dashboardContainer}>
        {joinedRoom ? (
          <div className={styles.connectedPanel}>
            <header className={styles.lobbyHeader}>
              <div className={styles.statusGroup}>
                <span className={styles.pulseNode}></span>
                <h2>Multiplayer Lobby</h2>
              </div>
              <div className={styles.roomCodeBadge}>
                <span className={styles.badgeLabel}>ACTIVE ID</span>
                <span className={styles.badgeValue}>{roomId || "Syncing..."}</span>
              </div>
            </header>

            {!quizFetched ? (
              <div className={styles.waitState}>
                <div className={styles.radarIcon}>📡</div>
                <h3>Waiting for Arena Initialization</h3>
                <p>Ensure all competitive participants have populated the server roster before firing the starter gun.</p>
                <button onClick={handleStartQuiz} className={styles.launchButton}>
                  Start Quiz Arena
                </button>
              </div>
            ) : (
              startQuiz && quiz && (
                <div className={styles.componentMount}>
                  <AttemptQuiz quiz={quiz} socket={socket} />
                </div>
              )
            )}
          </div>
        ) : (
          <div className={styles.gatewayForm}>
            <div className={styles.formHeader}>
              <span className={styles.themeSub}>APOLLO'S ORACLE</span>
              <h1 className={styles.formTitle}>Gaming Gateways</h1>
              <p className={styles.formDesc}>Orchestrate an isolated quiz server or synchronize into an active contender session.</p>
            </div>

            <div className={styles.splitActionGrid}>
              <div className={styles.actionCard}>
                <div className={styles.cardIcon}>👑</div>
                <h3>Host New Hub</h3>
                <p>Initialize a secure, fresh multiplayer room. You'll receive a distinct routing hash code to issue to peers.</p>
                <button onClick={handleCreateRoom} className={styles.createBtn}>
                  Generate Room
                </button>
              </div>

              <div className={styles.actionCard}>
                <div className={styles.cardIcon}>🔑</div>
                <h3>Join Existing Hub</h3>
                <p>Input a target allocation server hash code key below to establish direct socket pipeline connections.</p>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    placeholder="Paste target Room ID string"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className={styles.styledInput}
                  />
                </div>
                <button onClick={handleJoinRoom} className={styles.joinBtn} disabled={!roomId.trim()}>
                  Sync to Session
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizRoom;
