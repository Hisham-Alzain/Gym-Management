import { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LoginContext, ProfileContext } from './utils/Contexts.jsx';
import { CheckToken, FetchProfile } from './apis/AuthApis.jsx';
import AnonymousRoutes from './utils/AnonymousRoutes.jsx';
import AdminRoutes from './utils/AdminRoutes.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import Users from './components/UsersTable.jsx';
import Meals from './components/Diets/Meals.jsx';
import AddDiet from './components/Diets/AddDiet.jsx';
import ShowDiet from './components/Diets/ShowDiet.jsx';
import Exercises from './components/Workouts/Exercises.jsx';
import AddWorkout from './components/Workouts/AddWorkout.jsx';
import ShowProgram from './components/Workouts/ShowProgram.jsx';
import LoadingBars from './components/LoadingBars.jsx';
import './App.css';


function App() {
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // if (!initialized.current) {
    //   initialized.current = true;

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
              console.log(response);
            }
          }).then(() => {
            setIsLoading(false);
          });
        }
        else {
          Cookies.remove('access_token');
          console.log(response);
          setIsLoading(false);
        }
      });
    }
    else {
      setIsLoading(false);
    }
    // }
  }, []);

  useEffect(() => {
    if (loggedIn && accessToken) {
      setIsLoading(true);
      FetchProfile(accessToken).then((response) => {
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
  }, [loggedIn]);


  if (isLoading) {
    return <LoadingBars />;
  }
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn, accessToken, setAccessToken }}>
      <ProfileContext.Provider value={{ profile, setProfile }}>
        <BrowserRouter>
          <Routes>
            <Route element={<AnonymousRoutes />}>
              <Route path="/" element={<Login />} />
            </Route>
            <Route element={<AdminRoutes />}>
              <Route path="/home" element={<Users />} />
              <Route path="/meals" element={<Meals />} />
              <Route path="/exercises" element={<Exercises />} />
              <Route path="/trainee/diet/:program_id/:user_name" element={<ShowDiet />} />
              <Route path="/trainee/diet/add/:user_id/:user_name" element={<AddDiet />} />
              <Route path="/trainee/workout/:program_id/:user_name" element={<ShowProgram />} />
              <Route path="/trainee/workout/add/:user_id/:user_name" element={<AddWorkout />} />
              <Route path='/logout' element={<Logout />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProfileContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
