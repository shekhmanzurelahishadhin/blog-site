import React, { useState, useEffect } from 'react'
import PostCard from '../../frontend-component/PostCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
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
import HeroSection from '../../frontend-component/HeroSection';
import CategorySlider from '../../frontend-component/CategorySlider';
import FeaturedPosts from '../../frontend-component/FeaturedPosts';
import ContactSection from '../../frontend-component/ContactSection ';


const HomePage = () => {

  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);



  // Fetch categories from Laravel API
  const fetchCategories = async () => {
    setCategoriesLoading(true);
    try {
      const res = await api.get('/category-list');
      setCategories(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
      localStorage.removeItem('auth_token');
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch Posts from Laravel API
  const fetchPosts = async () => {
    setPostsLoading(true);
    try {
      const res = await api.get('/post-list');
      setPosts(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch posts');
      localStorage.removeItem('auth_token');
    } finally {
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
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
      <HeroSection />
      <CategorySlider categories={categories} loading={categoriesLoading} />
      <FeaturedPosts posts={posts} loading={postsLoading} />
      <ContactSection />
    </div>
  );
};

export default HomePage;