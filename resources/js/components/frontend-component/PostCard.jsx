import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { NavLink } from 'react-router-dom';

const PostCard = ({ post }) => {
  // Static post data - will be replaced with API data later
  const date = new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = post.description || '';
  const excerpt = tempDiv.textContent?.substring(0, 150) + '...';

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover transition-slow">
      <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/${post.image}`} alt="Post thumbnail" className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-2">
          {post.categories?.map((category) => (
            <span key={category.id} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">{category.name}</span>
          ))}
        </div>
        <div className="text-sm text-gray-500 mb-1">{date}</div>
        <NavLink to={`/posts/${post.slug}`}>
          <h3 className="text-indigo-600 text-xl font-bold mb-3">{post.title}</h3>
        </NavLink>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <NavLink to={`/posts/${post.slug}`} className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center">
          Read More <FontAwesomeIcon icon={Icons['faArrowRight']} className="ml-2 text-sm" />
        </NavLink>
      </div>
    </div>
  );
};

export default PostCard;
