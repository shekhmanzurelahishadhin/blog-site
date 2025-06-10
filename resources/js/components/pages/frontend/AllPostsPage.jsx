import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import api from '../../../api/axios';
import PostCard from '../../frontend-component/PostCard';
import Skeleton from 'react-loading-skeleton';

const AllPostsPage = () => {
  // State management
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const initialCategory = params.get("category") || "All";
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

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
      setFilteredPosts(res.data.data);
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
  // Get unique categories
  const categoryNames = ['All', ...new Set(categories.map(category => category?.name))];

  // Filter posts based on search and category
  // Filter posts based on searchQuery and selectedCategory
  useEffect(() => {
    let tempPosts = posts;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      tempPosts = tempPosts.filter(post =>
        post.title.toLowerCase().includes(q) ||
        post.slug.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All') {
      tempPosts = tempPosts.filter(post =>
        post.categories.some(cat => cat.name === selectedCategory)
      );
    }


    setFilteredPosts(tempPosts);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, posts]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);


  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setFilteredPosts(posts);
  };


  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Posts</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse through our collection of insightful articles on various topics.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="relative w-full md:w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categoryNames.map((categoryName) => (
                  <option key={categoryName} value={categoryName}>{categoryName}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {postsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md p-6">
                <Skeleton height={180} className="mb-4" />
                <Skeleton height={20} width={100} className="mb-2" />
                <Skeleton height={24} width="80%" className="mb-2" />
                <Skeleton count={3} />
              </div>
            ))}
          </div>
        ) : currentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-gray-600">No articles found matching your criteria</h3>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}


        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-indigo-600 text-white' : 'border border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllPostsPage;