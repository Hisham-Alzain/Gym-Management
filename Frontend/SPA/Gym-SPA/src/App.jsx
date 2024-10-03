import { useState } from 'react'
import { CgGym, CgCheck } from 'react-icons/cg';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import cat1 from './assets/cat1.png'
import cat2 from './assets/cat2.png'
import team1 from './assets/team1.png'
import team2 from './assets/team2.png'
import team3 from './assets/team3.png'
import icon1 from './assets/icon1.svg'
import icon2 from './assets/icon2.svg'
import icon3 from './assets/icon3.svg'
import './App.css'

function App() {
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

  return (
    <>
      <nav>
        <ul id="navigation">
          <li><a href="#home">Home</a></li>
          <li><a href="">About</a></li>
          <li><a href="#training">Training</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <section id='home'>
        <div className="container">
          <div className="caption">
            <span>Hi This is Coach Amr</span>
            <h1>Gym Trainer</h1>
          </div>
        </div>
      </section>

      <section id='training'>
        <div className='container'>
          <div className='row'>
            <div className='column'>
              <div className='topic'>
                <div className='topic-img'>
                  <img src={cat1} alt="" />
                  <div className='content-box'>
                    <div className='content'>
                      <h3>Personal traning</h3>
                      <p>You’ll look at graphs and charts in Task One, how to approach the task and <br /> the language needed for a successful answer.</p>
                      <a href="" className="btn">View Courses</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='column'>
              <div className='topic'>
                <div className='topic-img'>
                  <img src={cat2} alt="" />
                  <div className='content-box'>
                    <div className='content'>
                      <h3>Group traning</h3>
                      <p>You’ll look at graphs and charts in Task One, how to approach the task and <br /> the language needed for a successful answer.</p>
                      <a href="" className="btn">View Courses</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='gallery'>
        <div className='container'>
          <div className='row'>
            <div className='column'>
              <div className="section-title">
                <h2>What I Offer</h2>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='column'>
              <div className='box'>
                <div className='icon'>
                  <img src={team1} alt="" />
                </div>
                <div className='caption'>
                  <h5><a href="">Body Building</a></h5>
                  <p>You’ll look at graphs and charts in Task One, how to approach the task </p>
                </div>
              </div>
            </div>
            <div className='column'>
              <div className='box'>
                <div className='icon'>
                  <img src={team2} alt="" />
                </div>
                <div className='caption'>
                  <h5><a href="">Muscle Gain</a></h5>
                  <p>You’ll look at graphs and charts in Task One, how to approach the task </p>
                </div>
              </div>
            </div>
            <div className='column'>
              <div className='box'>
                <div className='icon'>
                  <img src={team3} alt="" />
                </div>
                <div className='caption'>
                  <h5><a href="">Weight Loss</a></h5>
                  <p>You’ll look at graphs and charts in Task One, how to approach the task </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id='pricing'>
        <div className='container'>
          <div className='row'>
            <div className='column'>
              <div className='section-title'>
                <h2>Pricing</h2>
              </div>
            </div>
          </div>
          <div className='row'>
            {pricing.map((p) => (
              <div className='column'>
                <div className='card'>
                  <CgGym className='icon' />
                  <div className='details'>
                    <span className='plan'>{p.plan}</span>
                    <p>{p.price}  <span>{p.span_txt}</span></p>
                    {p.features.map((feature) => (
                      <div className='features'>
                        <CgCheck className='check' />
                        <p>{feature}</p>
                      </div>
                    ))}
                    <a href="#" className='button'>Join Now</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id='contact'>
        <div className='container'>
          <div className='row'>
            <div className='column'>
              <div className='item'>
                <div className='icon'>
                  <img src={icon1} alt="" />
                </div>
                <div className='caption'>
                  <h3>Location</h3>
                  <p>You’ll look at graphs and charts in Task One, how to approach </p>
                </div>
              </div>
            </div>
            <div className='column'>
              <div className='item'>
                <div className='icon'>
                  <img src={icon2} alt="" />
                </div>
                <div className='caption'>
                  <h3>Phone</h3>
                  <p>(90) 277 278 2566</p>
                  <p>  (78) 267 256 2578</p>
                </div>
              </div>
            </div>
            <div className='column'>
              <div className='item'>
                <div className='icon'>
                  <img src={icon3} alt="" />
                </div>
                <div className='caption'>
                  <h3>Email</h3>
                  <p>Amrcoach@gmail.com</p>
                  <p>coashAmr@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: '2000px' }}> K </div>

    </>
  )
}

export default App
