import { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes, FaDoorOpen } from "react-icons/fa";
import { LoginContext, ProfileContext } from '../utils/Contexts.jsx';
import logo from '../assets/gym.jpg';
import styles from '../styles/navbar.module.css';


const NavBar = () => {
  // Translations
  const { t, i18n } = useTranslation('global');
  // Context
  const { loggedIn, accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);

  useEffect(() => {
    localStorage.setItem('Lang', i18n.language);
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n.language]);

  const changeLanguage = (event) => {
    if (event.target.value === 'en' || event.target.value === 'ar') {
      i18n.changeLanguage(event.target.value);
    }
  };

  const langs = [
    { key: "en", value: "en", O: "English" },
    { key: "ar", value: "ar", O: "العربية" }
  ];

  return (
    <nav>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <a href="/home">{t('components.nav_bar.nav_logo')}</a>
        </div>
        <input
          type="radio"
          name="slider"
          id="menu_btn"
          className={styles.menu_btn}
        />
        <input
          type="radio"
          name="slider"
          id="close_btn"
          className={styles.close_btn}
        />

        <ul className={styles.nav_links}>
          <div className={styles.nav_links_left}>
            {loggedIn && <>
              <li>
                <a href="/home">{t('components.nav_bar.li_home')}</a>
              </li>
              <li>
                <a href="/meals">{t('components.nav_bar.li_meals')}</a>
              </li>
              <li>
                <a href="/exercises">{t('components.nav_bar.li_exercises')}</a>
              </li>
            </>}
          </div>
          <div className={styles.nav_links_right}>
            <label
              htmlFor="close_btn"
              className={`${styles.btn} ${styles.close_btn}`}
            >
              <FaTimes size={31} />
            </label>
            <div className={styles.lang}>
              <select onChange={changeLanguage} value={i18n.language}>
                {langs.map((lang) => (
                  <option key={lang.key} value={lang.value}>
                    {lang.O}
                  </option>
                ))}
              </select>
            </div>
            {loggedIn ? (
              <li id='Logout'>
                <a href="/logout" title={t('components.nav_bar.logout')}>
                  <span className={styles.logout_span}>
                    <span><FaDoorOpen size={23} /></span>
                    <label htmlFor="Logout" className={styles.mobile_item}>
                      {t('components.nav_bar.logout')}
                    </label>
                  </span>
                </a>
              </li>
            ) : (
              <li>
                <a href="/login">{t('components.nav_bar.li_login')}</a>
              </li>
            )}
          </div>
        </ul>
        <label
          htmlFor="menu_btn"
          className={`${styles.btn} ${styles.menu_btn}`}
        >
          <FaBars size={29} />
        </label>
      </div>
    </nav>
  );
};

export default NavBar;
