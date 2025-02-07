import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { LoginContext, ProfileContext } from './Contexts';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';


const AdminRoutes = () => {
    const { loggedIn } = useContext(LoginContext);
    const { profile } = useContext(ProfileContext);

    // Routes that Appear when user is (The Admin)
    return (
        loggedIn && profile.role == "Trainer" ?
            <><NavBar /><Outlet /><Footer /></> : <Navigate to="/" replace />
    );
}

export default AdminRoutes;
