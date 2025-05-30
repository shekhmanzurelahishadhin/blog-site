// src/components/FeaturedPosts.jsx
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import PostCard from './PostCard';

const FeaturedPosts = ({ posts, loading }) => (
  <section className="py-16">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-bold">Featured <span className="gradient-text">Articles</span></h2>
        <NavLink to="/posts" className="text-indigo-600 hover:text-indigo-800 font-medium">View All →</NavLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md p-6">
              <Skeleton height={180} className="mb-4" />
              <Skeleton height={20} width={100} className="mb-2" />
              <Skeleton height={24} width="80%" className="mb-2" />
              <Skeleton count={3} />
            </div>
          ))
          : posts.map((post) => {
            return (
              <PostCard key={post.id} post={post} />
            );
          })}
      </div>
    </div>
  </section>
);

export default FeaturedPosts;
