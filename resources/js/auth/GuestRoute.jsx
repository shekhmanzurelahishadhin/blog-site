// src/routes/GuestRoute.jsx
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';
import Preloader from '../components/ui/Preloader';


const GuestRoute = ({ children }) => {
    const { user, authLoading } = useAuth();
    if (authLoading) {
        return <Preloader/>;
    }
    return !user ? children : <Navigate to="/admin" replace />;
};

export default GuestRoute;
