import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap'; // optional if you use bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './auth/AuthContext';
import ScrollToTop from './components/ui/ScrollToTop';
import ScrollTopButton from './components/ui/ScrollTopButton';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <BrowserRouter>
      <ScrollToTop />
        <AuthProvider>
            <App />
        </AuthProvider>
        <ToastContainer />
        <ScrollTopButton />
    </BrowserRouter>
);
