import { faBars, faTimes, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from "../../auth/useAuth";


const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth(); // Get auth status from your auth context
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const toggleUserDropdown = () => {
        setShowUserDropdown(!showUserDropdown);
    };
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowUserDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleLogout = () => {
        logout({ redirectTo: '/' });
        setShowUserDropdown(false);
        closeMobileMenu();
    };

    const navLinkClasses = ({ isActive }) =>
        `block text-gray-700 hover:text-indigo-600 py-2 rounded transition ${
            isActive ? 'text-indigo-600 font-medium' : ''
        }`;

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <NavLink to="/" className="text-xl font-bold gradient-text">
                        Shadhin<span className="text-indigo-600">Verse</span>
                    </NavLink>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to="/" end className={navLinkClasses}>
                            Home
                        </NavLink>
                        <NavLink to="/posts" className={navLinkClasses}>
                            All Posts
                        </NavLink>
                        <NavLink to="/about" className={navLinkClasses}>
                            About
                        </NavLink>
                        <NavLink to="/contact-us" className={navLinkClasses}>
                            Contact Us
                        </NavLink>

                        {user ? (
                            <div ref={dropdownRef} className="relative">
                                <button
                                    onClick={toggleUserDropdown}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 focus:outline-none"
                                >
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <FontAwesomeIcon icon={faUser} className="text-indigo-600" />
                                        </div>
                                    )}
                                    <span className="hidden md:inline">{user?.name || 'Account'}</span>
                                </button>

                                {showUserDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        <NavLink
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                                            onClick={() => setShowUserDropdown(false)}
                                        >
                                            Your Profile
                                        </NavLink>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 flex items-center"
                                        >
                                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink
                                to="auth/login"
                                className={({ isActive }) =>
                                    `px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition ${
                                        isActive ? 'bg-indigo-700' : ''
                                    }`
                                }
                            >
                                Login
                            </NavLink>
                        )}
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-700 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-2xl" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-2 space-y-2 pb-4 border-t pt-4">
                        <NavLink to="/" end className={navLinkClasses} onClick={closeMobileMenu}>
                            Home
                        </NavLink>
                        <NavLink to="/posts" className={navLinkClasses} onClick={closeMobileMenu}>
                            All Posts
                        </NavLink>
                        <NavLink to="/categories" className={navLinkClasses} onClick={closeMobileMenu}>
                            Categories
                        </NavLink>
                        <NavLink to="/about" className={navLinkClasses} onClick={closeMobileMenu}>
                            About
                        </NavLink>

                        {isAuthenticated ? (
                            <>
                                <NavLink
                                    to="/profile"
                                    className={navLinkClasses}
                                    onClick={closeMobileMenu}
                                >
                                    Your Profile
                                </NavLink>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 flex items-center"
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition ${
                                        isActive ? 'bg-indigo-700' : ''
                                    }`
                                }
                                onClick={closeMobileMenu}
                            >
                                Login
                            </NavLink>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;
