import React from 'react'
import {
  FaDumbbell, FaCheck, FaLocationDot,
  FaPhone, FaEnvelope
} from 'react-icons/fa6';
import cat1 from './assets/cat1.png'
import cat2 from './assets/cat2.png'
import team1 from './assets/team1.png'
import team2 from './assets/team2.png'
import team3 from './assets/team3.png'
import './App.css'

function App() {
  const navigation = [
    { href: '#home', name: 'Home' },
    { href: '#', name: 'About' },
    { href: '#about', name: 'Training' },
    { href: '#gallery', name: 'Gallery' },
    { href: '#pricing', name: 'Pricing' },
    { href: '#contact', name: 'Contact' },
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
      <nav>
        <ul id="navigation">
          {navigation.map((n) => (
            <li><a href={n.href}>{n.name}</a></li>
          ))}
        </ul>
      </nav>

      <section id='home'>
        <div className="caption">
          <span>Hi This is Coach Amr</span>
          <h1>Gym Trainer</h1>
        </div>
      </section>

      {/* Training*/}
      <section id='training'>
        <div className='container'>
          <div className='row'>
            {training.map((t) => (
              <div className='column'>
                <div className='topic'>
                  <div className='topic-img'>
                    <img src={t.img} alt="" />
                    <div className='content-box'>
                      <div className='content'>
                        <h3>{t.h3}</h3>
                        <p>{t.p}</p>
                        <a href="#" className="btn">View Courses</a>
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
            {gallery.map((g) => (
              <div className='column'>
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
            {pricing.map((p) => (
              <div className='column'>
                <div className='card'>
                  <FaDumbbell className='icon' />
                  <div className='details'>
                    <span className='plan'>{p.plan}</span>
                    <p>{p.price}  <span>{p.span_txt}</span></p>
                    {p.features.map((feature) => (
                      <div className='features'>
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
            {contact.map((c) => (
              <div className='column'>
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

      <div style={{ height: '1000px' }}> K </div>

    </>
  )
}

export default App
