import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-xl font-bold gradient-text">Mindful<span className="text-indigo-600">Bytes</span></NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => 
                `text-gray-700 hover:text-indigo-600 transition-slow ${isActive ? 'text-indigo-600 font-medium' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/posts" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-indigo-600 transition-slow ${isActive ? 'text-indigo-600 font-medium' : ''}`
              }
            >
              All Posts
            </NavLink>
            <NavLink 
              to="/categories" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-indigo-600 transition-slow ${isActive ? 'text-indigo-600 font-medium' : ''}`
              }
            >
              Categories
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-indigo-600 transition-slow ${isActive ? 'text-indigo-600 font-medium' : ''}`
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/subscribe" 
              className={({ isActive }) => 
                `px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-slow ${isActive ? 'bg-indigo-700' : ''}`
              }
            >
              Subscribe
            </NavLink>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-gray-700 focus:outline-none">
              <FontAwesomeIcon icon={faBars} className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;