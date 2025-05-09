import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
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
            Mindful<span className="text-indigo-600">Bytes</span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" end className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/posts" className={navLinkClasses}>
              All Posts
            </NavLink>
            <NavLink to="/categories" className={navLinkClasses}>
              Categories
            </NavLink>
            <NavLink to="/about" className={navLinkClasses}>
              About
            </NavLink>
            <NavLink
              to="/subscribe"
              className={({ isActive }) =>
                `px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition ${
                  isActive ? 'bg-indigo-700' : ''
                }`
              }
            >
              Subscribe
            </NavLink>
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
            <NavLink
              to="/subscribe"
              className={({ isActive }) =>
                `block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition ${
                  isActive ? 'bg-indigo-700' : ''
                }`
              }
              onClick={closeMobileMenu}
            >
              Subscribe
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
