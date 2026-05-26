import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../design/contactUs.module.css';

const Contactus = () => {
    return (
        <div className={styles.pageContainer}>
            {/* Embedded Mini-Navbar to get back home seamlessly */}
            <div className={styles.miniNav}>
                <Link to="/" className={styles.brandLogo}>Apollo's Oracle</Link>
                <Link to="/" className={styles.backHomeBtn}>← Back Home</Link>
            </div>

            <div className={styles.mainContent}>
                {/* Contact Segment */}
                <section className={styles.contactSection}>
                    <h1 className={styles.sectionTitle}>Contact Us</h1>
                    <p className={styles.sectionSubtitle}>
                        If you have any questions or concerns, feel free to reach out to us through the following channels:
                    </p>

                    <div className={styles.gridContainer}>
                        <div className={styles.contactCard}>
                            <div className={styles.cardIcon}>✉️</div>
                            <h3>Email Support</h3>
                            <p>Email: <a href="mailto:support@apolloracles.com">support@apolloracles.com</a></p>
                        </div>

                        <div className={styles.contactCard}>
                            <div className={styles.cardIcon}>📞</div>
                            <h3>Calling Support</h3>
                            <p>Phone: +1 (555) 123-4567</p>
                        </div>

                        <div className={styles.contactCard}>
                            <div className={styles.cardIcon}>💬</div>
                            <h3>Chat Support</h3>
                            <p>Chat with our support team during business hours at <strong>+91 80080 80008</strong>.</p>
                        </div>
                    </div>
                </section>

                {/* FAQ Segment */}
                <section className={styles.faqSection}>
                    <h2 className={styles.faqTitle}>Frequently Asked Questions (FAQs)</h2>
                    
                    <div className={styles.faqList}>
                        <div className={styles.faqItem}>
                            <div className={styles.faqQuestion}>Q: Can we make a quiz without signing up?</div>
                            <div className={styles.faqAnswer}>A: Our website provides a plethora of opportunities to create quizzes, but to access them you will have to sign up.</div>
                        </div>

                        <div className={styles.faqItem}>
                            <div className={styles.faqQuestion}>Q: Is creating quizzes on the website payable?</div>
                            <div className={styles.faqAnswer}>A: Each and every feature of the website is completely free and is solely designed to foster the quizzing culture.</div>
                        </div>

                        <div className={styles.faqItem}>
                            <div className={styles.faqQuestion}>Q: What details are required to sign up with the website?</div>
                            <div className={styles.faqAnswer}>A: The website requires you to give a username, an email ID, and frame a password.</div>
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

export default Contactus;
