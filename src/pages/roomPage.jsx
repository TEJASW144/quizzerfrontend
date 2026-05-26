import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import styles from '../design/RoomPage.module.css';

const socket = io('https://quizzerbackend.onrender.com');

const RoomPage = ({ roomCode, isAdmin }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  // Auto-scroll to the newest message whenever the feed updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      socket.emit('message', { roomCode, isAdmin, message: newMessage });
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.lobbyContainer}>
        
        {/* Top Header Deck */}
        <header className={styles.lobbyHeader}>
          <div className={styles.titleArea}>
            <span className={styles.pulseIndicator}></span>
            <h1>Lobby Room</h1>
          </div>
          <div className={styles.codeBadge}>
            <span className={styles.badgeLabel}>ROOM CODE</span>
            <span className={styles.badgeValue}>{roomCode || "000000"}</span>
          </div>
        </header>

        {/* Core Main Interface Grid */}
        <div className={styles.lobbyGrid}>
          
          {/* Left Panel: User Profile Info */}
          <aside className={styles.sidebarPanel}>
            <div className={styles.profileCard}>
              <div className={styles.avatarPlaceholder}>🔮</div>
              <h3>Your Status</h3>
              {isAdmin ? (
                <span className={`${styles.statusTag} ${styles.adminTag}`}>👑 Room Host</span>
              ) : (
                <span className={`${styles.statusTag} ${styles.playerTag}`}>🕹️ Contender</span>
              )}
            </div>
            
            <div className={styles.lobbyTips}>
              <h4>Game Rules</h4>
              <p>Wait for the administrator to synchronize the session clocks before committing your answers.</p>
            </div>
          </aside>

          {/* Right Panel: Live Feed Messaging Node */}
          <main className={styles.chatPanel}>
            <div className={styles.messageContainer}>
              {messages.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>Speech channel established. Broadcast a message to the arena.</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className={styles.chatRow}>
                    <div className={styles.msgBubble}>
                      <p>{message}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Action Deck */}
            <div className={styles.inputActionDeck}>
              <input
                type="text"
                placeholder="Broadcast something to the room..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className={styles.lobbyInput}
              />
              <button onClick={handleSendMessage} className={styles.sendButton}>
                Send
              </button>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default RoomPage;
