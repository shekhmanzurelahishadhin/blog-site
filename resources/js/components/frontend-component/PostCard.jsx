import React from 'react'

const PostCard = ({ post }) => {
  // Static post data - will be replaced with API data later
  const samplePost = {
    id: 1,
    title: 'Getting Started with React and Laravel',
    excerpt: 'Learn how to integrate React with Laravel to build modern web applications...',
    category: 'Technology',
    date: 'May 15, 2023',
    image: 'https://source.unsplash.com/random/400x300/?technology',
    readTime: '5 min read'
  };

  const postData = post || samplePost;

  return (
    <div className="post-card bg-white rounded-lg shadow-md overflow-hidden fade-in">
      <img 
        src={postData.image} 
        alt={postData.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium mb-2">
          {postData.category}
        </span>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{postData.title}</h3>
        <p className="text-gray-600 mb-4">{postData.excerpt}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{postData.date}</span>
          <span>{postData.readTime}</span>
        </div>
        <a 
          href={`/posts/${postData.id}`}
          className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Read More →
        </a>
      </div>
    </div>
  );
};

export default PostCard;
