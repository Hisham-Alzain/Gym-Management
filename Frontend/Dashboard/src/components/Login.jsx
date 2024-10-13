import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import banner from '../assets/hero.png';
import { LoginAPI } from '../apis/AuthApis';
import { LoginContext, ProfileContext } from '../utils/Contexts';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const Login = () => {
  const { t } = useTranslation('global');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn, setAccessToken } = useContext(LoginContext);
  const { setProfile } = useContext(ProfileContext);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [message, setMessage] = useState('')

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Perform Login logic (Call api)
    LoginAPI(
      email,
      password,
      rememberMe)
      .then((response) => {
        if (response.status === 200) {
          // Store token and Log in user 
          const token = response.data.access_token;
          const expires = response.data.expires_at;
          setMessage(response.data.message);
          setLoggedIn(true);
          setAccessToken(token);
          setProfile(response.data.user);
          if (rememberMe) {
            // 1 Year
            Cookies.set('access_token', token, { secure: true, expires: 365 });
            console.log(token)
          }
          else {
            // 1 Day
            Cookies.set('access_token', token, { secure: true, expires: 1 });
            console.log(token)
          }
          navigate('/home')

        }
        else {
          console.log(password + ' ' + email + ' ' + rememberMe)
          console.log(response);
          if (response.data.errors.data) {
            setMessage(t('pages.Login.error'));
            setTimeout(() => {
              setMessage('');
            }, 5000);
          } else if (response.data.errors.email) {
            setMessage(t('pages.Login.email_error'));
            setTimeout(() => {
              setMessage('');
            }, 5000);
          }
        }
      }).then(() => {
        // Reset the form fields
        setIsLoading(false);
        setEmail('');
        setPassword('');
        setRememberMe(false);
      });
  };
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className={styles.login_container}>
      <div className={styles.banner}>
        <img src={banner} alt="Banner" />
      </div>
      <div className={styles.row}>
        <div className={styles.col + ' ' + styles.leftSection}>
          <div className={styles.left_content}>
            <h1 style={{ fontFamily: 'Roboto', fontSize: '4vw', color: '#F3EEEBFF' }}>
              Welcome to your Clients Dashboard
            </h1>
          </div>
        </div>
        <div className={styles.col + ' ' + styles.rightSection}>
          <div className={styles.right_content}>
            <h1 style={{ fontFamily: 'Roboto', fontSize: '4vw', fontWeight: 700, color: '#F2E8E6FF' }}>
              Log-in
            </h1>
            <div className={styles.input_field}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.input_field}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.checkBox}>
              <input
                id="rememberMe"
                type="checkbox"
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <label htmlFor="rememberMe">{t('pages.Login.remember_me')}</label>
            </div>
            <div className={styles.button_container}>
              <button className={styles.login_button} onClick={handleSubmit}>
                Log-In
              </button>
            </div>
            <div>
              <p className={styles.error_message}>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;