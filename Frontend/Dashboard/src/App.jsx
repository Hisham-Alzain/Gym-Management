import { useEffect, useState, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import {  LoginContext, ProfileContext } from './utils/Contexts.jsx';
import AnonymousRoutes from './utils/AnonymousRoutes.jsx';
import AdminRoutes from './utils/AdminRoutes.jsx';
import './App.css'
import Login from './components/Login.jsx';
import { FetchProfile,CheckToken } from './apis/AuthApis.jsx';
import Home from './components/Home.jsx';
import Logout from './components/Logout.jsx';

function App() {
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
       // Get user token from cookie (if there is any)
       const cookieToken = Cookies.get('access_token');
       console.log(cookieToken)
       // Check user token
       if (typeof cookieToken !== 'undefined') {
        CheckToken(cookieToken).then((response) => {
          console.log("true")
          if (response.status === 200) {
            setLoggedIn(true);
            setAccessToken(cookieToken);

            FetchProfile(cookieToken).then((response) => {
              console.log(response.data.data)
              if (response.status === 200) {
                setProfile(response.data.data);
              }
              else {
                console.log(response);
              }
            }).then(() => {
              setIsLoading(false);
            });
          }
          else {
            Cookies.remove('access_token');
            setIsLoading(false);
            console.log(response.statusText);
          }
        });
      }
      else {
        setIsLoading(false);
      }
    }
  }, [loggedIn]);
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn, accessToken, setAccessToken }}>
        <ProfileContext.Provider value={{ profile, setProfile }}>
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<Login />} />
              <Route element={<AdminRoutes />}>
                <Route path="/home" element={<Home/>} />
                <Route path='/logout' element={<Logout/>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ProfileContext.Provider>
      </LoginContext.Provider>
  )
}

export default App
