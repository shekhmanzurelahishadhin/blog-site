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
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(form, setForm, setErrors, setIsLoading);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                        placeholder="••••••••"
                        required
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/50 hover:text-white/80 focus:outline-none"
                    >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        )}
                    </button>
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
                <button
                    type="button"
                    onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`}

                    className="flex items-center justify-center py-2.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.672-4.166-2.698-6.735-2.698-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.496 10-10 0-0.67-0.069-1.325-0.189-1.971h-9.811z"/>
                    </svg>
                    <span className="text-sm">Google</span>
                </button>
                <button
                    type="button"
                    onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`}
                    className="flex items-center justify-center py-2.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-sm">GitHub</span>
                </button>
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
