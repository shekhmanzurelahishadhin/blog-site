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
import PostList from './pages/posts/PostList';
import PostDetails from './pages/posts/PostDetails';
import HomePage from './pages/frontend/HomePage';
import AllPostsPage from './pages/frontend/AllPostsPage';
import PostDetailPage from './pages/frontend/PostDetailPage';
import PublicLayouts from './layouts/PublicLayouts';
import SocialCallback from './pages/auth/SocialCallback';
import ContactMessageList from "./pages/contact-message/ContactMessageList";
import SubscriberList from "./pages/subsciber/SubscriberList";



export default function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path='/' element={<PublicLayouts />}>
                <Route index element={<HomePage />} />
                <Route path='posts' element={<AllPostsPage />} />
                <Route path='posts/:slug' element={<PostDetailPage />} />
                <Route path='categories/:slug' element={<AllPostsPage />} />
            </Route>
            <Route path='/auth' element={
                <GuestRoute>
                    <AuthLayouts />
                </GuestRoute>
            }>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
            </Route>

            <Route path='/admin' element={
                <PrivateRoute role={1}>
                    <AdminLayouts />
                </PrivateRoute>
            }>
                <Route index element={<Dashboard />} />
                <Route path='categories' element={<CategoryList />} />
                <Route path='posts' element={<PostList />} />
                <Route path="posts/:slug" element={<PostDetails />} />
                <Route path='message-list' element={<ContactMessageList />} />
                <Route path='subscriber-list' element={<SubscriberList />} />
            </Route>
            <Route path="/auth/social-callback" element={<SocialCallback />} />
        </Routes>
    );
}

