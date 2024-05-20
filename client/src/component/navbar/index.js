import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './style.css';
import logo from './logo.png';

function MainNav({ LoggedIn,setLoggedIn }) {
    const { t } = useTranslation(); // Hook for translation

    const handleLogout = async () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    };

    
    return (
        <header className='header'>
            <nav className="contanier">
                <Link as={Link} to="/">
                    <img src={logo} alt="Your Logo" height="50" />
                </Link>
                
                <div className="nav-links">
                    <Link to="/" className="a">
                        {t('navbar.home')}
                    </Link>
                    <Link to="/About" className="a">
                        {t('navbar.about')}
                    </Link>
                    <Link to="/Contact" className="a">
                        {t('navbar.contact')}
                    </Link>
                    
                    {LoggedIn ? (
                        <Link className="a" id="login" onClick={handleLogout} to="/">
                            {t('navbar.logout')}
                        </Link>
                    ) : (
                        <Link className=" a" id="login" to="/Sign">
                            {t('navbar.login')}
                        </Link>
                    )}
                </div>
                
            </nav>
        </header>
    );
}

export default MainNav;
