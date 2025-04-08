// resources/js/components/pages/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../auth/useAuth';


export default function Login() {

    const{ login } = useAuth();
    const [form, setForm] = useState({
        email: '',
        password: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(form, setForm, setErrors, setIsLoading);
    };

      return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">Email Address</label>
                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                        placeholder="you@example.com"
                        required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email[0]}</p>}
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-white/80">Password</label>
                    <Link to="/auth/forgot-password" className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline">
                        Forgot password?
                    </Link>
                </div>
                <div className="relative">
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                        placeholder="••••••••"
                        required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                </div>
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password[0]}</p>}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                    isLoading 
                        ? 'bg-cyan-600/50 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-cyan-500/30'
                }`}
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Signing in...</span>
                    </>
                ) : (
                    <>
                        <span>Sign In</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </>
                )}
            </button>

            {/* Optional social login buttons and registration link */}
            <div className="flex items-center space-x-4 my-4">
                <div className="flex-1 h-px bg-white/20"></div>
                <span className="text-sm text-white/50">OR</span>
                <div className="flex-1 h-px bg-white/20"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {/* Social buttons stay as-is */}
            </div>

            <p className="text-sm text-center text-white/70">
                Don't have an account?{' '}
                <Link to="/auth/register" className="text-cyan-400 hover:text-cyan-300 hover:underline font-medium">
                    Create one
                </Link>
            </p>
        </form>
    );
}