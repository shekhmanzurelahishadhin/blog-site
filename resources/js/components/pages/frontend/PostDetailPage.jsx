import React from 'react'
import CategoryFilter from '../../frontend-component/CategoryFilter';
import PostDetail from '../../frontend-component/PostDetail';

const PostDetailPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4">
          <PostDetail />
        </div>
        
        <div className="md:w-1/4">
          <CategoryFilter />
          
          <div className="bg-white p-4 rounded-lg shadow mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">About Author</h2>
            <div className="flex items-center mb-3">
              <img 
                src="https://source.unsplash.com/random/100x100/?portrait" 
                alt="Author"
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h3 className="font-medium">Jane Doe</h3>
                <p className="text-sm text-gray-500">Web Developer</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Passionate about web technologies and creating amazing user experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
