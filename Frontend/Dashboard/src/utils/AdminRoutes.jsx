import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { LoginContext, ProfileContext } from './Contexts';


const AdminRoutes = () => {
    const { loggedIn } = useContext(LoginContext);
    const { profile } = useContext(ProfileContext);

    console.log(loggedIn, profile);
    // Routes that Appear when user is (The Admin)
    return (
        loggedIn && profile.role == "Trainer" ? <Outlet /> : <Navigate to="/" replace />
    );
}

export default AdminRoutes;
