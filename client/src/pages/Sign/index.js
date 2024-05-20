import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import './style.css';

function Login({ LoggedIn, setLoggedIn }) {

  const { t } = useTranslation(); // Access the translation function
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (LoggedIn) navigate("/");
  }, [LoggedIn])

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send login data to backend
    axios.post('https://call-1.onrender.com/login', { username, password })
      .then((response) => {
        // Handle successful login
        alert(t('messages.loginSuccess'));

        // Store token in local storage
        localStorage.setItem('token', response.data.token);
        setLoggedIn(response.data.token)
        // Redirect to appropriate page based on isAdmin status
        if (response.data.isAdmin) {
          navigate('/Admin');
        } else {
          navigate('/user');
        }

      })
      .catch((error) => {
        // Handle login error
        alert(t('messages.loginError'));
      });
  };

  return (
    <div className="login">
      <div className="back">
        <h1>{t('login.welcome')}</h1>
        <h2>{t('login.workspace')}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <h1>{t('login.login')}</h1>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t('login.usernamePlaceholder')} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('login.passwordPlaceholder')} />
        <input type="submit" value={t('login.loginButton')} />
        <Link to="/signup">{t('login.registrationLink')}</Link>
      </form>
    </div>
  );
}

export default Login;
