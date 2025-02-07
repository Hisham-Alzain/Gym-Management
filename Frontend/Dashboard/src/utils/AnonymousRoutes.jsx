import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { LoginContext } from './Contexts';


const AnonymousRoutes = () => {
  const { loggedIn } = useContext(LoginContext);

  // Routes that Appear when user is not LoggedIn
  return (
    loggedIn ? <Navigate to="/home" replace /> : <Outlet />
  );
}

export default AnonymousRoutes;
