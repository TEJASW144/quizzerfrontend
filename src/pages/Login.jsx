import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../design/Signup.module.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/login", formData);
            console.log('Data sent successfully: ', response.data);

            const token = response.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('username', formData.username);

            navigate('/welcompage');
        } catch (error) {
            console.log('Failed to send data: ', error);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            {/* Redesigned Minimal Navigation Bar */}
            <nav className={styles.navbar}>
                <div className={styles.navbarleft}>
                    <Link to="/" className={styles.brandTitle}>Apollo's Oracle</Link>
                </div>
                <div className={styles.navbarright}>
                    <Link to="/" className={styles.navlink}>Home</Link>
                    <Link to="/signup" className={styles.navlink}>Sign Up</Link>
                </div>
            </nav>

            {/* Split Screen Container */}
            <div className={styles.main}>
                <div className={styles.container}>
                    
                    {/* Left Panel: Focused Form Block */}
                    <div className={styles.loginform}>
                        <h1 className={styles.formTitle}>Welcome Back</h1>
                        <p className={styles.formSubtitle}>Please log in to your account to continue</p>
                        
                        <form onSubmit={handleSubmit} className={styles.formElement}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="username" className={styles.inputLabel}>Username</label>
                                <input 
                                    type="text" 
                                    id="username" 
                                    name="username" 
                                    placeholder="Enter your username"
                                    onChange={handleInputChange} 
                                    className={styles.styledInput}
                                    required 
                                />
                            </div>
                             
                            <div className={styles.inputGroup}>
                                <label htmlFor="password" className={styles.inputLabel}>Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    placeholder="Enter your password"
                                    onChange={handleInputChange}
                                    className={styles.styledInput}
                                    required 
                                />
                            </div>

                            <button type="submit" className={styles.coolbuttonround}>
                                Sign In
                            </button>
                        </form>
                    </div>
                    
                    {/* Right Panel: Translucent Mythology Card */}
                    <div className={styles.backgroundimage}>
                        <div className={styles.quotationbox}>
                            <span className={styles.quoteAccent}>THE LEGEND</span>
                            <h2>About Us</h2>
                            <p>
                                In the ancient and mystical world of Greek Mythology, the temple of Apollo served as a place of divine wisdom and prophetic insight. It was here that Apollo, the radiant Sun God, imparted knowledge and foresight through the oracle priestess.
                            </p>
                            <p className={styles.highlightParagraph}>
                                <strong>Apollo's Oracle</strong> is a quizzing site inspired by the profound wisdom of the Oracle of Delphi. This website serves as a modern-day equivalent to the ancient temple, allowing users to engage in quizzes that challenge their knowledge and wisdom.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Login;
