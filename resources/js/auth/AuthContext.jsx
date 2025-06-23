import React, { createContext, useState, useEffect } from 'react'
import api from '../api/axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Preloader from '../components/ui/Preloader';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true); // 👈
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            api.get('/user')
                .then((res) => setUser(res.data))
                .catch(() => {
                    localStorage.removeItem('auth_token');
                    setUser(null);
                })
                .finally(() => setAuthLoading(false));
        } else {
            setAuthLoading(false);
        }
    }, []);

    const register = async (form, setForm, setErrors, setLoading) => {
        setLoading(true);
        try {
            const response = await api.post('/register', form);

            if (response.data.token) {
                setUser(response.data.user);
                localStorage.setItem('auth_token', response.data.token);
                setForm({
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                });
                setErrors({}); // Clear any old errors
                toast.success('Registration successful!');

                if (response.data.user.role === 1) {
                    navigate('/admin'); // Admin route
                } else {
                    navigate('/'); // Normal user route
                }
            }
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {}); // ✅ Extract only the 'errors' part
            } else {
                toast.error(error.response?.data?.message || 'Registration failed!');
            }
        } finally {
            setLoading(false);
        }
    };



    const login = async (form, setForm, setErrors, setLoading) => {
        setLoading(true);
        try {
            const response = await api.post('/login', form);

            if (response.data.token) {
                setUser(response.data.user);
                localStorage.setItem('auth_token', response.data.token);
                setForm({ email: '', password: '', message: '' });
                toast.success('Login successful!');
                navigate('/admin');
                if (response.data.user.role === 1) {
                    navigate('/admin'); // Admin route
                } else {
                    navigate('/'); // Normal user route
                }
            }
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else if (error.response?.status === 401) {
                // Laravel may return 401 with a generic message
                setErrors({ email: [error.response.data.message] });
            } else {
                toast.error(error.response?.data?.message || 'Login failed!');
            }
        }
        finally {
            setLoading(false);
        }
    };

    const logout = async (options = {}) => {
        const { redirectTo = '/auth/login' } = options; // Default to login page

        try {
            await api.post('/logout');
        } catch (error) {
            console.error('Logout API error:', error.response?.data || error.message);
            // Optionally show a toast or fallback message
        } finally {
            // Always clear client state regardless of API success
            localStorage.removeItem('auth_token');
            setUser(null);
            navigate(redirectTo); // Use the specified redirect
        }
    };
    const subscribe = async (formData, setFormData, setErrors) => {
        try {
            // Assuming form only contains { email: "user@example.com" }
            const response = await api.post('/subscribe', formData);

            // For a subscription, just check success status or message
            if (response.status === 200 || response.data.success) {
                setFormData({ email: '' });  // Clear email input
                setErrors({});           // Clear previous errors
                toast.success('Subscribed successfully!');
            } else {
                toast.error('Subscription failed. Please try again.');
            }
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                toast.error(error.response?.data?.message || 'Subscription failed. Please try again.');
            }
        } finally {
        }
    };


    const setToken = async (token) => {
        localStorage.setItem('auth_token', token);

        try {
            // Fetch the authenticated user info from backend
            const response = await api.get('/user');
            setUser(response.data);
            setAuthLoading(false)
        } catch (error) {
            // If token is invalid or fetch fails, clear user state
            localStorage.removeItem('auth_token');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, register, logout, login, authLoading, setToken, subscribe }}>
            {authLoading ? <Preloader /> : children}
        </AuthContext.Provider>
    )
};

