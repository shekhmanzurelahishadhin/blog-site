import React from 'react';
import { Routes,Route } from 'react-router-dom';
import AuthLayouts from './Layouts/AuthLayouts';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
    return (
        <Routes>
            <Route path='/auth' element={<AuthLayouts />}>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
            </Route>
        </Routes>
    );
}

