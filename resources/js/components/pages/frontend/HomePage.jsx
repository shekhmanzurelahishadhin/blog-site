import React, { useState, useEffect } from 'react'
import PostCard from '../../frontend-component/PostCard';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faLaptopCode,
//   faBrain,
//   faChartLine,
//   faLightbulb,
//   faBriefcase,
//   faHeartPulse, // Note: 'heartbeat' is now 'heart-pulse' in Font Awesome 6
//   faCoins,
//   faArrowRight,
//   faBars
// } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../api/axios';
import * as Icons from '@fortawesome/free-solid-svg-icons';


const HomePage = () => {

  const [categories, setCategories] = useState([]);
  const allPosts = [
    {
      id: 1,
      title: "The Future of AI in Everyday Life",
      excerpt: "Exploring how artificial intelligence will transform our daily routines in the coming decade.",
      content: "Full content about AI future... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.",
      category: "Technology",
      date: "June 15, 2023",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoryColor: "indigo"
    },
    {
      id: 2,
      title: "The Science of Habit Formation",
      excerpt: "Understanding how habits work and how to build better ones using neuroscience.",
      content: "Full content about habit formation... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.",
      category: "Psychology",
      date: "May 28, 2023",
      image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
      categoryColor: "purple"
    },
    {
      id: 3,
      title: "10 Productivity Hacks for Developers",
      excerpt: "Proven techniques to help you get more done in less time without burning out.",
      content: "Full content about productivity hacks... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.",
      category: "Productivity",
      date: "April 12, 2023",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoryColor: "blue"
    },
    {
      id: 4,
      title: "Creative Thinking Techniques",
      excerpt: "Boost your creativity with these proven thinking methods.",
      content: "Full content about creative thinking... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.",
      category: "Creativity",
      date: "March 5, 2023",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      categoryColor: "green"
    }
  ];

  // const categories = [
  //     { name: "Technology", icon: faLaptopCode, count: 25, color: "indigo" },
  //     { name: "Psychology", icon: faBrain, count: 18, color: "purple" },
  //     { name: "Productivity", icon: faChartLine, count: 32, color: "blue" },
  //     { name: "Creativity", icon: faLightbulb, count: 14, color: "green" },
  //     { name: "Business", icon: faBriefcase, count: 22, color: "yellow" },
  //     { name: "Health", icon: faHeartPulse, count: 19, color: "red" },
  //     { name: "Finance", icon: faCoins, count: 16, color: "teal" }
  // ];
  // Fetch categories from Laravel API
  const fetchCategories = async () => {
    try {
      const res = await api.get('/category-list');
      setCategories(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
      localStorage.removeItem('auth_token');
    } finally {
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="">

      {/* Hero Section */}
      <section className="hero-pattern py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Nourish Your <span className="gradient-text">Curious Mind</span> With Thoughtful Content
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Explore insightful articles on technology, personal growth, and creativity.
                Join our community of lifelong learners.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="#" className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-center transition-slow">
                  Start Reading
                </a>
                <a href="#" className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 text-center transition-slow">
                  Popular Posts
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Person reading"
                className="rounded-lg shadow-xl floating max-w-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Explore By <span className="gradient-text">Categories</span></h2>
          <Slider {...settings}>
            {categories.map((category, index) => (
              <div key={index} className="px-2">
                <div
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-slow text-center block h-full cursor-pointer"
                >
                  <div className={`mb-4`}>
                    <FontAwesomeIcon style={{ color: category.color }} icon={Icons[category.icon]} className="text-3xl" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm">20 Articles</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured <span className="gradient-text">Articles</span></h2>
            <NavLink to="/posts" className="text-indigo-600 hover:text-indigo-800 font-medium no-underline">
              View All →
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md card-hover transition-slow">
                <img
                  src={post.image}
                  alt="Post thumbnail"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className={`bg-${post.categoryColor}-100 text-${post.categoryColor}-800 px-2 py-1 rounded-full text-xs`}>
                      {post.category}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <NavLink
                    to={`/post/${post.id}`}
                    className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center no-underline"
                  >
                    Read More <FontAwesomeIcon icon={Icons['faArrowRight']} className="ml-2 text-sm" />
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold mb-4">Get In <span className="gradient-text">Touch</span></h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Have questions or want to collaborate? Send us a message and we'll get back to you soon.
            </p>

            <form className="max-w-md mx-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-slow"
                >
                  Send Message
                </button>
              </div>
            </form>

            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <div className="flex items-center">
                <div className="bg-indigo-100 p-3 rounded-full mr-3">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>contact@mindfulbytes.com</span>
              </div>
              <div className="flex items-center">
                <div className="bg-indigo-100 p-3 rounded-full mr-3">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;