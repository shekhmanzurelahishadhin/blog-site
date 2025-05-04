import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const Header = () => {
  return (
     <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <a href="#" className="text-xl font-bold gradient-text">Mindful<span className="text-indigo-600">Bytes</span></a>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-slow">Home</a>
                            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-slow">Articles</a>
                            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-slow">Categories</a>
                            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-slow">About</a>
                            <a href="#" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-slow">Subscribe</a>
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