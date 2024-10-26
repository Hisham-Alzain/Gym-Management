import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { LoginContext, ProfileContext } from '../utils/Contexts';
import { LoginAPI } from '../apis/AuthApis';
import banner from '../assets/hero.png';
import styles from '../styles/login.module.css';


const Login = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { setLoggedIn, setAccessToken } = useContext(LoginContext);
  const { setProfile } = useContext(ProfileContext);
  // States
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Perform Login logic (Call api)
    LoginAPI(email, password, rememberMe).then((response) => {
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
        }
        else {
          // 1 Day
          Cookies.set('access_token', token, { secure: true, expires: 1 });
        }

        navigate('/home');
      } else {
        if (response.data.errors) {
          setMessage(t('pages.Login.error'));
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
  }

  if (isLoading) {
    return <></>
  }
  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <img src={banner} alt="Banner" />
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.left_content}>
            <h1>Welcome to your Clients Dashboard</h1>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.right_content}>
            <form onSubmit={handleSubmit} className={styles.login_form}>
              <h1>Log-in</h1>
              <div className={styles.input_field}>
                <input
                  required
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.input_field}>
                <input
                  required
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p>{message}</p>
              <div>
                <input
                  id="rememberMe"
                  type="checkbox"
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <label htmlFor="rememberMe">{t('pages.Login.remember_me')}</label>
              </div>
              <div className={styles.button_container}>
                <button className={styles.login_button}>
                  Log-In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
