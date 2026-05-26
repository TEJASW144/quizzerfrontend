import { Outlet, Link, useNavigate } from "react-router-dom";
import styles from '../design/Homepage.module.css';

const WelcomePage = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };

    return (
        <div className={styles.body}>
            <div className={styles.bgimage}>
                {/* Modern Authenticated Navigation Header */}
                <div className={styles.header}>
                    <div className={styles.navGroupLeft}>
                        <Link to="/aboutus">
                            <button className={styles.About}>About Us</button>
                        </Link>
                        <Link to="/contactus">
                            <button className={styles.About}>Contact Us</button>
                        </Link>
                    </div>
                    
                    <div className={styles.buttons}>
                        <h2 className={styles.userGreeting}>
                            Welcome, <span>{localStorage.getItem('username') || 'Contender'}</span>
                        </h2>
                        <Link to="/" onClick={handleLogout}>
                            <button className={styles.logoutBtn}>Logout</button>
                        </Link>
                    </div>
                </div>

                {/* Main Hero Panel */}
                <div className={styles.heroContent}>
                    <h1 className={styles.h1}>Apollo's Oracle</h1>
                    <p className={styles.heroSubtitle}>Your terminal session is synchronized. Choose your vector.</p>
                    
                    <div className={styles.centerbuttons}>
                        <Link to="/create-quiz">
                            <button className={styles.buttonPrimary}>
                                <span>Create Quiz ››</span>
                            </button>
                        </Link>
                        <Link to="/quizroom">
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

export default WelcomePage;
