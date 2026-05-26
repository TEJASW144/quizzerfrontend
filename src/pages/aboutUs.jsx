import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../design/aboutus.module.css';

const AboutUs = () => {
    return (
        <div className={styles.pageContainer}>
            {/* Unified Top Navigation Panel */}
            <div className={styles.miniNav}>
                <Link to="/" className={styles.brandLogo}>Apollo's Oracle</Link>
                <Link to="/" className={styles.backHomeBtn}>← Back Home</Link>
            </div>

            <div className={styles.mainContent}>
                {/* Hero Title Block */}
                <section className={styles.heroSection}>
                    <h1 className={styles.sectionTitle}>About Us</h1>
                    <p className={styles.sectionSubtitle}>
                        Fostering intellectual curiosity, breaking knowledge barriers, and celebrating the vibrant culture of quizzing.
                    </p>
                </section>

                {/* Core Mission Panel */}
                <div className={styles.splitGrid}>
                    <div className={styles.storyCard}>
                        <h2>Who We Are</h2>
                        <p>
                            Welcome to <strong>Apollo's Oracle</strong>, an interactive multi-player platform engineered to deliver knowledge-driven entertainment. Built for casual trivia fans and competitive quiz masters alike, we provide accessible tools to orchestrate custom gaming arenas seamlessly.
                        </p>
                    </div>
                    <div className={styles.storyCard}>
                        <h2>Our Core Mission</h2>
                        <p>
                            We believe that continuous learning shouldn't feel structural or rigid. Our mission is to democratize education gamification by delivering a premium, zero-cost architecture where anyone can construct, share, and experience custom quizzes instantly.
                        </p>
                    </div>
                </div>

                {/* Feature Grid Elements */}
                <section className={styles.valuesSection}>
                    <h2 className={styles.gridTitle}>Why Choose Apollo's Oracle?</h2>
                    <div className={styles.gridContainer}>
                        <div className={styles.valueCard}>
                            <div className={styles.cardIcon}>⚡</div>
                            <h3>Instant Lobbies</h3>
                            <p>Generate isolated socket-driven multiplayer rooms in a single click for instantaneous group competitive play.</p>
                        </div>

                        <div className={styles.valueCard}>
                            <div className={styles.cardIcon}>🛠️</div>
                            <h3>Custom Sandbox</h3>
                            <p>An intuitive interface to construct distinct schemas, answer keys, and structural timing configurations effortlessly.</p>
                        </div>

                        <div className={styles.valueCard}>
                            <div className={styles.cardIcon}>💎</div>
                            <h3>Permanently Free</h3>
                            <p>Every feature, database cluster connection, and multiplayer lobby module is open and accessible without paywalls.</p>
                        </div>
                    </div>
                </section>
            </div>

            <footer className={styles.footer}>
                <p>&copy; 2026 Apollo's Oracle. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AboutUs;
