import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayouts from './Layouts/AuthLayouts';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/admin/Dashboard';
import AdminLayouts from './layouts/AdminLayouts';
import PrivateRoute from '../auth/PrivateRoute';
import GuestRoute from '../auth/GuestRoute';
import CategoryList from "./pages/categories/CategoryList";



export default function App() {
    return (
        <Routes>
            <Route path='/auth' element={
                <GuestRoute>
                    <AuthLayouts />
                </GuestRoute>
            }>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
            </Route>

            <Route path='/admin' element={
                <PrivateRoute>
                    <AdminLayouts />
                </PrivateRoute>
            }>
                <Route index element={<Dashboard />} />
                <Route path='categories' element={<CategoryList />} />
            </Route>

        </Routes>
    );
}

