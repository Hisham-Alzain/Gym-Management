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
import gym from './assets/gym.jpg'
import cat1 from './assets/cat1.png';
import cat2 from './assets/cat2.png';
import coach from './assets/coach.jpg';
import app from './assets/gym-app.jpg';
import team1 from './assets/team1.png';
import team2 from './assets/team2.png';
import team3 from './assets/team3.png';
import './App.css';

function App() {
  // Translations
  const { t, i18n } = useTranslation('global');

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

  const navbar = useRef();
  const toggleNavbar = () => {
    navbar.current.classList.toggle('responsive');
  }

  const navigation = [
    { href: '#home', name: 'Home' },
    { href: '#about', name: 'About' },
    { href: '#training', name: 'Training' },
    { href: '#gallery', name: 'Gallery' },
    { href: '#pricing', name: 'Pricing' },
    { href: '#contact', name: 'Contact' },
  ]

  const about = [
    { img: coach },
    {
      h3: 'Coach Amr:',
      p: 'a trustworthy coach with a certificate in human organs and chemical effects in the body specialize in reforming the body to the desired shape.'
    },
    { img: app },
    {
      h3: 'My app:',
      p: 'special app designed to give professional advices and workout plans and it also provides many nutritional programs to give you the best experince and results.'
    }
  ]

  const training = [
    { img: cat1, h3: 'Personal traning', p: 'GG' },
    { img: cat2, h3: 'Group traning', p: 'GG' }
  ]
  const gallery = [
    { img: team1, h5: 'Body Building', p: 'GG' },
    { img: team2, h5: 'Muscle Gain', p: 'GG' },
    { img: team3, h5: 'Weight Loss', p: 'GG' }
  ]

  const pricing = [
    {
      plan: '1 Month',
      price: '$50/M',
      span_txt: '(Single class)',
      features: [
        'Free riding',
        'Unlimited equipments',
        'Personal trainer',
        'Weight losing classes',
        'Month to mouth'
      ]
    },
    {
      plan: '3 Months',
      price: '$40/M',
      span_txt: '(Single class)',
      features: [
        'Free riding',
        'Unlimited equipments',
        'Personal trainer',
        'Weight losing classes',
        'Month to mouth'
      ]
    },
    {
      plan: '6 Months',
      price: '$30/M',
      span_txt: '(Single class)',
      features: [
        'Free riding',
        'Unlimited equipments',
        'Personal trainer',
        'Weight losing classes',
        'Month to mouth'
      ]
    }
  ]

  const contact = [
    { icon: <FaLocationDot className='icon' />, h3: 'Location', p: 'Damascus, Syria' },
    { icon: <FaPhone className='icon' />, h3: 'Phone', p: '(+963) 958 295 285' },
    { icon: <FaEnvelope className='icon' />, h3: 'Email', p: 'CoachAmr@gmail.com' }
  ]

  return (
    <>
      <header>
        {/* NavBar */}
        <nav className='nav' ref={navbar}>
          <button className='hide-nav' onClick={toggleNavbar}>
            <FaTimes />
          </button>
          <img className='logo' src={gym} alt='Logo' />
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
          <div className="caption">
            <span>Hi This is Amr Khalaf</span>
            <h1>Gym Trainer</h1>
          </div>
        </section>

        {/* About */}
        <section id='about'>
          <div className='container'>
            <div className='row'>
              {about.map((a, i) => (
                <div key={i} className='column'>
                  <div className='sec'>
                    <div className='sec-img'>
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
                <h2>Training</h2>
              </div>
            </div>
            <div className='row'>
              {training.map((t, i) => (
                <div key={i} className='column'>
                  <div className='topic'>
                    <div className='topic-img'>
                      <img src={t.img} alt="" />
                      <div className='content-box'>
                        <div className='content'>
                          <h3>{t.h3}</h3>
                          <p>{t.p}</p>
                          <a href="#" className='btn'>View Courses</a>
                        </div>
                      </div>
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
                <h2>What I Offer</h2>
              </div>
            </div>
            <div className='row'>
              {gallery.map((g, i) => (
                <div key={i} className='column'>
                  <div className='box'>
                    <div className='box-img'>
                      <img src={g.img} alt="" />
                    </div>
                    <div className='caption'>
                      <h5>{g.h5}</h5>
                      <p>{g.p}</p>
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
                <h2>Pricing</h2>
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
                        <a href="#" className='btn'>Join Now</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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
                      <a href='#'><img src={gym} alt="" /></a>
                      <div className='lang'>
                        Language:
                        <select onChange={changeLanguage} value={i18n.language}>
                          <option key='en' value='en'>
                            English
                          </option>
                          <option key='ar' value='ar'>
                            Arabic
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
                    Copyright ©<script>document.write(new Date().getFullYear());</script>2024 All rights reserved
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
