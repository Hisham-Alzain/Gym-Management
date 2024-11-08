import { useTranslation } from 'react-i18next';
import {
    FaFacebookF, FaInstagram,
    FaWhatsapp, FaTelegramPlane
} from 'react-icons/fa';
import gym from '../assets/gym.jpg'
import styles from '../styles/footer.module.css'


const Footer = () => {
    // Translations
    const { t } = useTranslation('global');

    return (
        <footer>
            {/* Footer */}
            <div className={styles.footer}>
                <div className={styles.container}>
                    <div className={styles.top}>
                        <div className={styles.row}>
                            <div className={styles.column}>
                                <div className={styles.caption}>
                                    <div className={styles.f_logo}>
                                        <a href='#'><img src={gym} alt="" /></a>
                                    </div>
                                    <div className={styles.social}>
                                        <a href="#"><FaFacebookF /></a>
                                        <a href="#"><FaInstagram /></a>
                                        <a href="#"><FaWhatsapp /></a>
                                        <a href="#"><FaTelegramPlane /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.row}>
                            <div className={styles.column}>
                                <div className={styles.copy_right}>
                                    Copyright ©<script>document.write(new Date().getFullYear());</script>2024 All rights reserved
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
