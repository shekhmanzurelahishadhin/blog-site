import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faLinkedin,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* About Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">MindfulBytes</h3>
            <p className="mb-4">
              Thoughtful content for curious minds. Explore, learn, and grow with our community of lifelong learners.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white text-xl transition-colors">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl transition-colors">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl transition-colors">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl transition-colors">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl transition-colors">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Articles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Popular Posts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Categories</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">Technology</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Psychology</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Productivity</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Creativity</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Business</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Health & Wellness</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 mr-3 text-indigo-400" />
                <span>123 Knowledge Street, Learning City, Ed 45678</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-indigo-400" />
                <a href="mailto:info@mindfulbytes.com" className="hover:text-white">info@mindfulbytes.com</a>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3 text-indigo-400" />
                <a href="tel:+11234567890" className="hover:text-white">+1 (123) 456-7890</a>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon icon={faClock} className="mt-1 mr-3 text-indigo-400" />
                <span>Mon-Fri: 9AM - 5PM<br/>Sat-Sun: Closed</span>
              </li>
            </ul>

            {/* Newsletter Subscription */}
            <div className="mt-8">
              <h5 className="text-white font-medium mb-3">Subscribe to Newsletter</h5>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>© {new Date().getFullYear()} MindfulBytes. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;