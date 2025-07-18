import React, {useEffect, useState} from 'react';
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
import api from "../../api/axios";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import useAuth from "../../auth/useAuth";

const Footer = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        email: ''
    });
    const [errors, setErrors] = useState({});
    const{ subscribe } = useAuth();
    // Fetch categories from Laravel API
    const fetchCategories = async () => {

        try {
            const res = await api.get('/category-list?limit=5&sort=desc');
            setCategories(res.data.data);
        } catch (error) {
            toast.error('Failed to fetch categories');
            localStorage.removeItem('auth_token');
        } finally {

        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            [name]: value
        });
        // Clear error when user types
        if (errors[name]) {
            setErrors({
                [name]: null
            });
        }
    };

    const submitSubscribeForm = async (e) => {
        e.preventDefault();
        await subscribe(formData, setFormData, setErrors);
    }
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* About Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">ShadhinVerse</h3>
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
                {
                    categories.map((category)=>
                        (
                            <li key={category?.id}><Link to={`/posts?category=${encodeURIComponent(category.name)}`} className="hover:text-white transition-colors">{category?.name}</Link></li>
                        )
                    )
                }
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 mr-3 text-indigo-400" />
                <span>46-B-1, North Maniknagar, Dhaka-1203</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-indigo-400" />
                <a href="mailto:shadhinmonzur18@gmail.com" className="hover:text-white">shadhinmonzur18@gmail.com</a>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3 text-indigo-400" />
                <a href="tel:+8801973829988" className="hover:text-white">+8801973829988</a>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon icon={faClock} className="mt-1 mr-3 text-indigo-400" />
                <span>Sun-Thu: 9AM - 5PM<br/>Fri-Sat: Closed</span>
              </li>
            </ul>

            {/* Newsletter Subscription */}
            <div className="mt-8">
              <h5 className="text-white font-medium mb-3">Subscribe to Newsletter</h5>
              <form onSubmit={submitSubscribeForm} className="flex">
                <input
                  type="email"
                  value={formData.email}
                  placeholder="Your email"
                  onChange={(e) => {
                      handleInputChange(e);
                      // Auto-generate slug when name changes (only for new categories)
                      setFormData({
                          email: e.target.value
                      });
                  }}
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
          <p>© {new Date().getFullYear()} ShadhinVerse. All rights reserved.</p>
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
