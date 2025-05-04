import React from 'react'
import PostCard from './PostCard';

const PostDetail = () => {
  // Static post data - will be replaced with API data later
  const post = {
    id: 1,
    title: 'Getting Started with React and Laravel',
    content: `
      <p>In this comprehensive guide, we'll walk through the process of integrating React with Laravel to build modern web applications.</p>
      <p>First, let's set up our Laravel backend...</p>
      <h2>Setting Up Laravel</h2>
      <p>Create a new Laravel project...</p>
      <h2>Integrating React</h2>
      <p>For the frontend, we'll use React with Vite for faster development...</p>
    `,
    category: 'Technology',
    date: 'May 15, 2023',
    image: 'https://source.unsplash.com/random/800x400/?technology',
    readTime: '5 min read',
    author: {
      name: 'Jane Doe',
      avatar: 'https://source.unsplash.com/random/100x100/?portrait'
    }
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={post.image} 
        alt={post.title}
        className="w-full h-64 md:h-96 object-cover"
      />
      <div className="p-6 md:p-8">
        <div className="flex items-center mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
            {post.category}
          </span>
          <span className="mx-4 text-gray-400">•</span>
          <span className="text-gray-500 text-sm">{post.date}</span>
          <span className="mx-4 text-gray-400">•</span>
          <span className="text-gray-500 text-sm">{post.readTime}</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">{post.title}</h1>
        
        <div className="flex items-center mb-8">
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <span className="text-gray-700 font-medium">{post.author.name}</span>
        </div>
        
        <div 
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="mt-12 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostDetail;
