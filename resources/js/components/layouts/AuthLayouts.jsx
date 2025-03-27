// resources/js/components/Layouts/AuthLayouts.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayouts() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] flex items-center justify-center p-4">
            <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl bg-white/5 backdrop-blur-lg border border-white/10 text-white transform transition-all hover:scale-[1.01] hover:shadow-cyan-500/20">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-400/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Welcome Back
                </h2>
                <p className="text-center text-white/70 mb-6">Sign in to access your account</p>
                <Outlet />
            </div>
            
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute rounded-full bg-cyan-400/10"
                        style={{
                            width: Math.random() * 300 + 100 + 'px',
                            height: Math.random() * 300 + 100 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            filter: 'blur(40px)',
                            transform: `rotate(${Math.random() * 360}deg)`
                        }}
                    />
                ))}
            </div>
        </div>
    );
}