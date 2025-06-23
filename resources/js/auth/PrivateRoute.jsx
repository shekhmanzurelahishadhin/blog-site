import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';
import Preloader from '../components/ui/Preloader';

const PrivateRoute = ({ children, role }) => {
    const { user, authLoading } = useAuth();

    if (authLoading) {
        return <Preloader />;
    }

    if (!user) {
        // Not logged in
        return <Navigate to="/auth/login" replace />;
    }

    if (role !== undefined) {
        // Check role: assuming user.role is an integer like 0 (user), 1 (admin)
        if (user.role !== role) {
            // Role not authorized, redirect or show error
            return <Navigate to="/" replace />; // or a 403 page
        }
    }

    // Authorized
    return children;
};

export default PrivateRoute;
