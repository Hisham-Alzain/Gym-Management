import { useEffect, useState, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import {  LoginContext, ProfileContext } from './utils/Contexts.jsx';
import AnonymousRoutes from './utils/AnonymousRoutes.jsx';
import AdminRoutes from './utils/AdminRoutes.jsx';
import './App.css'
import Login from './components/Login.jsx';
import { FetchProfile,CheckToken } from './apis/AuthApis.jsx';

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
       // Check user token
       if (typeof cookieToken !== 'undefined') {
        CheckToken(cookieToken).then((response) => {
          if (response.status === 200) {
            setLoggedIn(true);
            setAccessToken(cookieToken);

            FetchProfile(cookieToken).then((response) => {
              if (response.status === 200) {
                setProfile(response.data.user);
              }
              else {
                console.log(response.statusText);
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
  }, []);
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn, accessToken, setAccessToken }}>
        <ProfileContext.Provider value={{ profile, setProfile }}>
          <BrowserRouter>
            <Routes>
              <Route element={<AdminRoutes />}>
                <Route path="/" element={<Admin />} />
              </Route>
              <Route element={<AnonymousRoutes />}>
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ProfileContext.Provider>
      </LoginContext.Provider>
  )
}

export default App
