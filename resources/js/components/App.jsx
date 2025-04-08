import React from 'react';
import { Routes,Route } from 'react-router-dom';
import AuthLayouts from './Layouts/AuthLayouts';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/admin/Dashboard';
import AdminLayouts from './layouts/AdminLayouts';



export default function App() {
    return (
        <Routes>
            <Route path='/auth' element={<AuthLayouts />}>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
            </Route>
            <Route path='/admin' element={<AdminLayouts/>}>
                <Route path='dashboard' element={
                    <Dashboard/>
                }/>
            </Route>
        </Routes>
    );
}

