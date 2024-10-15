import { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes, FaDoorOpen } from "react-icons/fa";
import { LoginContext, ProfileContext } from '../utils/Contexts.jsx';
import logo from '../assets/gym.jpg';
import styles from '../styles/navbar.module.css';


const NavBar = () => {
    // Translations
    const { t } = useTranslation('global');
    // Context
    const { loggedIn, accessToken } = useContext(LoginContext);
    const { profile } = useContext(ProfileContext);

    return (
        <nav>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <img src={logo} alt="logo" />
                    <a href="/home">
                        {t('components.nav_bar.nav_logo')}
                    </a>
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
                        {loggedIn &&
                            <li>
                                <a href="/home">{t('components.nav_bar.li_home')}</a>
                            </li>
                        }
                        <li>
                            <a href="/jobs/all" className={styles.desktop_item}>
                                {t('components.nav_bar.li_jobs')}
                            </a>
                            <input type="checkbox" id="Jobs" className={styles.showDrop} />
                            <label htmlFor="Jobs" className={styles.mobile_item}>
                                {t('components.nav_bar.li_jobs')}
                            </label>
                            <ul className={styles.drop_menu}>
                                <li className={styles.mobile_item2}>
                                    <a href="/jobs/all">{t('components.nav_bar.all')}</a>
                                </li>
                                <li>
                                    <a href="/workouts">{t('components.nav_bar.full_time')}</a>
                                </li>
                                <li>
                                    <a href="/jobs/PartTime">{t('components.nav_bar.part_time')}</a>
                                </li>
                                <li>
                                    <a href="/jobs/Freelancing">{t('components.nav_bar.freelancing')}</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="/jobs/post">{t('components.nav_bar.post_job')}</a>
                        </li>
                    </div>
                    <div className={styles.nav_links_right}>
                        <label
                            htmlFor="close_btn"
                            className={`${styles.btn} ${styles.close_btn}`}
                        >
                            <FaTimes size={31} />
                        </label>
                        {loggedIn ? (
                            <li id='Logout'>
                                <a href="/logout" title='Logout'>
                                    <span className={styles.Logoutplace}>
                                        <FaDoorOpen size={23} />
                                        <label htmlFor="Logout" className={styles.mobile_item}>
                                            Logout
                                        </label>
                                    </span>
                                </a>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <a href="/login">{t('components.nav_bar.li_login')}</a>
                                </li>
                            </>
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
