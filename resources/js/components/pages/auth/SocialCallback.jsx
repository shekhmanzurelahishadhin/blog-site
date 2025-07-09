import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../../../auth/useAuth';

export default function SocialCallback() {
    const [searchParams] = useSearchParams();
    const { setToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        if (token) {
            setToken(token);
            navigate('/admin');
        } else if (error) {
            navigate('/auth/login', { state: { error: 'Google login failed' } });
        } else {
            navigate('/auth/login');
        }
    }, [searchParams, setToken, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
                <p className="mt-4 text-white">Processing your login...</p>
            </div>
        </div>
    );
}
