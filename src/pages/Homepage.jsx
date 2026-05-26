import { Outlet, Link } from "react-router-dom";
import styles from '../design/Homepage.module.css';
import nasaBg from '../design/nasa (1).jpg';

const Homepage = () => {
    return (
        <div className={styles.body} style={{ backgroundImage: `url(${nasaBg})` }}>
            <div className={styles.bgimage}>
                {/* Modern Navigation Header */}
                <div className={styles.header}>
                    <div className={styles.navGroupLeft}>
                        {/* FIXED PATH TO /ABOUTUS */}
                        <Link to="/aboutus">
                            <button className={styles.About}>
                                About Us
                            </button>
                        </Link>

                        {/* FIXED PATH TO /CONTACTUS */}
                        <Link to="/contactus">
                            <button className={styles.About}>
                                Contact Us
                            </button>
                        </Link>
                    </div>

                    
                    <div className={styles.buttons}>
                        <Link to="/signup">
                            <button className={styles.signin}>Sign Up</button>
                        </Link>
                        <Link to="/login">
                            <button className={styles.loginBtn}>Log In</button>
                        </Link>
                    </div>
                </div>

                {/* Hero Core Content */}
                <div className={styles.heroContent}>
                    <h1 className={styles.h1}>Apollo's Oracle</h1>
                    <p className={styles.heroSubtitle}>Unleash your curiosity. Challenge your mind.</p>
                    
                    <div className={styles.centerbuttons}>
                        <Link to="/login">
                            <button className={styles.buttonPrimary}>
                                <span>Create Quiz ››</span>
                            </button>
                        </Link>
                        <Link to="/login">
                            <button className={styles.buttonSecondary}>
                                <span>New Quiz ›››</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Homepage;
