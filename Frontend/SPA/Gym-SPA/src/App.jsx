import { useEffect, useRef } from 'react';
import {
  FaBars, FaTimes, FaCheck,
  FaFacebookF, FaInstagram,
  FaWhatsapp, FaTelegramPlane
} from 'react-icons/fa';
import {
  FaDumbbell, FaLocationDot,
  FaPhone, FaEnvelope
} from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import Typed from 'typed.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo1 from './assets/logo1.png';
import logo2 from './assets/logo2.png';
import app from './assets/gym-app.jpg';
import coach from './assets/coach.jpg';
import team1 from './assets/team1.png';
import team2 from './assets/team2.png';
import team3 from './assets/team3.png';
import after from './assets/after.png';
import before from './assets/before.png';
import './App.css';
import ModelSection from './ModelSection';

function App() {
  // Translations
  const { t, i18n } = useTranslation('global');
  const year = new Date().getFullYear();
  const typedRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('Lang', i18n.language);
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    const options = {
      strings: [t('hero.typed_1'), t('hero.typed_2'), t('hero.typed_3')],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy(); // Cleanup on unmount
    };
  }, [i18n.language]);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const changeLanguage = (event) => {
    if (event.target.value === 'en' || event.target.value === 'ar') {
      i18n.changeLanguage(event.target.value);
    }
  };

  const navbar = useRef();
  const toggleNavbar = () => {
    navbar.current.classList.toggle('responsive');
  }

  const navigation = [
    { href: '#home', name: t('navigation.home') },
    { href: '#about', name: t('navigation.about') },
    { href: '#training', name: t('navigation.training') },
    { href: '#gallery', name: t('navigation.gallery') },
    { href: '#pricing', name: t('navigation.pricing') },
    { href: '#contact', name: t('navigation.contact') },
  ]

  const about = [
    { img: coach },
    {
      h3: t('about.name'),
      p: t('about.aboutMe'),
    },
    { img: app },
    {
      h3: t('about.app'),
      p: t('about.app_description'),
    }
  ]

  const training = [
    { img: team1, h5: t('training.h5_1') },
    { img: team2, h5: t('training.h5_2') },
    { img: team3, h5: t('training.h5_3') }
  ]

  const gallery = [
    { img: before, h3: t('gallery.h3_before'), p: ' ' },
    { img: after, h3: t('gallery.h3_after'), p: ' ' }
  ]

  const pricing = [
    {
      plan: '1 Month',
      price: '$150/M',
      features: [
        t('pricing.feature_1'),
        t('pricing.feature_2'),
        t('pricing.feature_3'),
        t('pricing.feature_4')
      ]
    },
    {
      plan: '3 Months',
      price: '$100/M',
      features: [
        t('pricing.feature_1'),
        t('pricing.feature_2'),
        t('pricing.feature_3'),
        t('pricing.feature_4')
      ]
    }
  ]

  const contact = [
    { icon: <FaLocationDot className='icon' />, h3: t('contact.h3_location'), p: t('contact.p_location') },
    { icon: <FaPhone className='icon' />, h3: t('contact.h3_phone'), p: t('contact.p_phone') },
    { icon: <FaEnvelope className='icon' />, h3: t('contact.h3_email'), p: t('contact.p_email') }
  ]

  return (
    <>
      <header>
        {/* NavBar */}
        <nav className='nav' ref={navbar}>
          <button className='hide-nav' onClick={toggleNavbar}>
            <FaTimes />
          </button>
          <img className='logo' src={logo2} alt='Logo' />
          <ul>
            {navigation.map((n, i) => (
              <li key={i} onClick={toggleNavbar}>
                <a href={n.href}>{n.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        <button className='show-nav' onClick={toggleNavbar}>
          <FaBars />
        </button>
      </header>

      <main>
        {/* Home */}
        <section id='home'>
          <div
            className="caption"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h1>{t('hero.name')}</h1>
            <span ref={typedRef}></span>
          </div>
        </section>

        {/* About */}
        <section id='about'>
          <div className='container'>
            <div className='row'>
              {about.map((a, i) => (
                <div key={i} className='column'>
                  <div className='sector'>
                    <div className='sector-img'>
                      {a.img && <img src={a.img} alt="" />}
                    </div>
                    <div className='content-box'>
                      <div className='content'>
                        {a.h3 && <h3>{a.h3}</h3>}
                        {a.p && <p>{a.p}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Training */}
        <section id='training'>
          <div className='container'>
            <div className='row'>
              <div className="section-title">
                <h2>{t('headers.head_1')}</h2>
              </div>
            </div>
            <div className='row'>
              {training.map((t, i) => (
                <div key={i} className='column'>
                  <div className='box'>
                    <div className='box-img'>
                      <img src={t.img} alt="" />
                    </div>
                    <div className='caption'>
                      <h5>{t.h5}</h5>
                      <p>{t.p}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id='gallery'>
          <div className='container'>
            <div className='row'>
              <div className="section-title">
                <h2>{t('headers.head_2')}</h2>
              </div>
            </div>
            <div className='row'>
              {gallery.map((g, i) => (
                <div key={i} className='column'>
                  <div className='topic'>
                    <div className='topic-img'>
                      <img src={g.img} alt="" />
                      <div className='content-box'>
                        <div className='content'>
                          <h3>{g.h3}</h3>
                          <p>{g.p}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id='pricing'>
          <div className='container'>
            <div className='row'>
              <div className='section-title'>
                <h2>{t('headers.head_3')}</h2>
              </div>
            </div>
            <div className='row'>
              {pricing.map((p, i) => (
                <div key={i} className='column'>
                  <div className='card'>
                    <FaDumbbell className='icon' />
                    <div className='details'>
                      <span className='plan'>{p.plan}</span>
                      <p>{p.price}  <span>{p.span_txt}</span></p>
                      {p.features.map((feature, index) => (
                        <div key={index} className='features'>
                          <FaCheck className='check' />
                          <p>{feature}</p>
                        </div>
                      ))}
                      <div className='button'>
                        <a href="#" className='btn'>{t('pricing.btn')}</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*<ModelSection />*/}
        {/* Contact */}
        <section id='contact'>
          <div className='container'>
            <div className='row'>
              {contact.map((c, i) => (
                <div key={i} className='column'>
                  <div className='item'>
                    {c.icon}
                    <div className='caption'>
                      <h3>{c.h3}</h3>
                      <p>{c.p}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        {/* Footer */}
        <div id='footer'>
          <div className='container'>
            <div className='top'>
              <div className='row'>
                <div className='column'>
                  <div className='caption'>
                    <div className='f-logo'>
                      <a href='#'><img src={logo2} alt="" /></a>
                      <div className='lang'>
                        {t('footer.lang')}
                        <select onChange={changeLanguage} value={i18n.language}>
                          <option key='en' value='en'>
                            {t('footer.en')}
                          </option>
                          <option key='ar' value='ar'>
                            {t('footer.ar')}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className='menu'>
                      <ul>
                        {navigation.map((n, i) => (
                          <li key={i} onClick={toggleNavbar}>
                            <a href={n.href}>{n.name}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className='social'>
                      <a href="#"><FaFacebookF /></a>
                      <a href="#"><FaInstagram /></a>
                      <a href="#"><FaWhatsapp /></a>
                      <a href="#"><FaTelegramPlane /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='bottom'>
              <div className='row'>
                <div className='column'>
                  <div className='copy-right'>
                    {`${t('footer.part1')}${year} ${t('footer.part2')}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
