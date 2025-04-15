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
                toast.success('Registration successful!');
                navigate('/admin/dashboard');
            }
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data); // validation errors
            } else {
                toast.error(error.response?.data?.error || 'Registration failed!');
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
                navigate('/admin/dashboard');
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

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error('Logout API error:', error.response?.data || error.message);
            // Optionally show a toast or fallback message
        } finally {
            // Always clear client state regardless of API success
            localStorage.removeItem('auth_token');
            setUser(null);
            navigate('/auth/login');
        }
    };
    return (
        <AuthContext.Provider value={{ user, setUser, register, logout, login, authLoading }}>
            {authLoading ? <Preloader /> : children}
        </AuthContext.Provider>
    )
};

