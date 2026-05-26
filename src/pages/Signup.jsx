import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../design/Signup.module.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });


    const handleInputChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        })
    }

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/signup", formData);
            console.log('Data sent successfully: ', response.data);

            const token = response.data.token;

            localStorage.setItem('token', token);
            localStorage.setItem('username', formData.username);

            navigate('/welcompage');

        }

        catch (error){
            console.log('Failed to send data: ', error);
        }
    }

    return(
        <div>
        <nav className={styles.navbar}>
        <div className={styles.navbarleft}>
            <h1 >Apollo's Oracle</h1>
        </div>
        <div className={styles.navbarright}>
        <Link to = "/"><a href="#" class={styles.navlink}>Home</a></Link>
            <Link to = "/login"><a href="#" class={styles.navlink}>Login</a></Link>
        </div>
    </nav>
    <div className={styles.main}>
    <div className={styles.container}>
        <div className={styles.loginform}>
            
            <h1>Sign-Up</h1>
            <form onSubmit={handleSubmit}>
                <label for="username">Username:</label>
                <div className={styles.usernameinput}>
                    <input type="text" id="username" name="username" onChange={handleInputChange} required />
                </div>
                <br />
                <label for="email">Email:</label>
                <div className={styles.emailinput}>
                    <input type="email" id="email" name="email" required onChange={handleInputChange} />
                </div>
                 
                <label for="password">Password:</label>
                    <div className={styles.passwordinput}>
                         <input type="password" id="password" name="password" required onChange={handleInputChange}></input>
                        </div>
                            <br />
                            <br />
                <button type="submit" className={styles.coolbuttonround}>Submit</button>
                
            </form>
        </div>
        
        <div className={styles.backgroundimage}>
            <div className={styles.quotationbox}>
                <h1>About Us:</h1>
                <br />
                <p>"In the ancient and mystical world of Greek Mythology, the temple of Apollo served as a place of divine wisdom and prophetic insight. It was here that Apollo, the radiant Sun God, imparted knowledge and foresight through the oracle priestess.
                    <b><i>Apollo's Oracle</i></b> is a quizzing site inspired by the profound wisdom of the Oracle of Delphi. This website serves as a modern-day equivalent to the ancient temple, allowing users to engage in quizzes that challenge their knowledge and wisdom, just as Apollo did through the oracle priestess." </p>
            </div>
           
                </div>
        </div>
        </div>
        </div>
    )

};
export default Signup;