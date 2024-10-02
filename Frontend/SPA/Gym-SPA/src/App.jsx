import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import cat1 from './assets/cat1.png'
import cat2 from './assets/cat2.png'
import './App.css'

function App() {

  return (
    <>
      <nav>
        <ul id="navigation">
          <li><a href="">Home</a></li>
          <li><a href="">About</a></li>
          <li><a href="">Training</a></li>
          <li><a href="">Gallery</a></li>
          <li><a href="">Pricing</a></li>
          <li><a href="">Contact</a></li>
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
            <div className='col'>
              <div className='topic'>
                <div className='topic-img'>
                  <img src={cat1} alt="" />
                  <div className="topic-content-box">
                    <div className="topic-content">
                      <h3>Personal traning</h3>
                      <p>You’ll look at graphs and charts in Task One, how to approach the task and <br /> the language needed for a successful answer.</p>
                      <a href="courses.html" className="btn">View Courses</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='topic'>
                <div className='topic-img'>
                  <img src={cat2} alt="" />
                  <div className="topic-content-box">
                    <div className="topic-content">
                      <h3>Group traning</h3>
                      <p>You’ll look at graphs and charts in Task One, how to approach the task and <br /> the language needed for a successful answer.</p>
                      <a href="courses.html" className="btn">View Courses</a>
                    </div>
                  </div>
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
