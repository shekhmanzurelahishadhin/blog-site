import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';
import Preloader from '../components/ui/Preloader';

const PrivateRoute = ({ children }) => {
    const { user, authLoading } = useAuth();

    if (authLoading) {
        return <Preloader/>;
    }
    return user ? children : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
