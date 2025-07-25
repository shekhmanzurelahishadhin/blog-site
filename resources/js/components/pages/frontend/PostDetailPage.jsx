import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faClock,
  faCalendarAlt,
  faUser,
  faShareAlt,
  faBookmark,
  faHeart,
  faArrowRight,
  faReply,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Comment-related state
  const [comments, setComments] = useState([
    {
      id: 1,
      author: { name: 'John Doe', initials: 'JD', avatar: null },
      text: 'This article really helped me understand the topic better!',
      date: '2023-06-15T10:30:00Z',
      likes: 5,
      liked: false,
      replies: [
        {
          id: 2,
          author: { name: 'Jane Smith', initials: 'JS', avatar: null },
          text: 'I completely agree! The examples were particularly helpful.',
          date: '2023-06-15T14:45:00Z',
          likes: 2,
          liked: false
        }
      ]
    },
    {
      id: 3,
      author: { name: 'Alex Johnson', initials: 'AJ', avatar: null },
      text: 'Does anyone have additional resources on this subject?',
      date: '2023-06-16T09:15:00Z',
      likes: 3,
      liked: true,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Current user (replace with your auth system)
  const currentUser = {
    name: 'Current User',
    initials: 'CU',
    avatar: null
  };

  // Fetch post data (replace with your API call)
  useEffect(() => {
    const fetchPost = async () => {
      // Mock data
      const mockPost = {
        id: 1,
        title: "The Future of AI in Everyday Life",
        content: `
          <h2>Introduction to AI's Impact</h2>
          <p>Artificial Intelligence is transforming how we live, work, and interact with technology.</p>
          <h3>Key Areas of Transformation</h3>
          <ul>
            <li>Healthcare diagnostics</li>
            <li>Personalized education</li>
            <li>Smart home automation</li>
          </ul>
          <blockquote>
            "AI will be the most transformative technology humanity has ever developed."
            <cite>- AI Researcher</cite>
          </blockquote>
        `,
        category: "Technology",
        date: "June 15, 2023",
        readTime: "8 min read",
        author: "Jane Doe",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        likes: 124,
        tags: ["AI", "Future Tech", "Innovation"]
      };

      setPost(mockPost);
      setLikeCount(mockPost.likes);

      // Mock related posts
      setRelatedPosts([
        {
          id: 2,
          title: "Machine Learning Fundamentals",
          excerpt: "Understanding the basics of machine learning algorithms.",
          category: "Technology",
          date: "May 28, 2023",
          readTime: "6 min read",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        }
      ]);
    };

    fetchPost();
  }, [id]);

  // Comment handlers
  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    
    const newCommentObj = {
      id: Date.now(),
      author: currentUser,
      text: newComment,
      date: new Date().toISOString(),
      likes: 0,
      liked: false,
      replies: []
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
    setShowCommentForm(false);
  };

  const handleReplySubmit = (commentId) => {
    if (!replyText.trim()) return;
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const newReply = {
          id: Date.now(),
          author: currentUser,
          text: replyText,
          date: new Date().toISOString(),
          likes: 0,
          liked: false
        };
        
        return {
          ...comment,
          replies: [...comment.replies, newReply]
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setReplyText('');
    setActiveReplyId(null);
  };

  const handleLikeComment = (commentId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          liked: !comment.liked
        };
      }
      return comment;
    }));
  };

  const handleLikeReply = (commentId, replyId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id === replyId) {
              return {
                ...reply,
                likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
                liked: !reply.liked
              };
            }
            return reply;
          })
        };
      }
      return comment;
    }));
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    navigator.share?.({
      title: post?.title,
      text: post?.excerpt || 'Check out this article',
      url: window.location.href
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    });
  };

  if (!post) {
    return <div className="text-center py-20">Loading post...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link 
        to="/posts" 
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to all articles
      </Link>

      {/* Article Header */}
      <div className="mb-8">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs mr-3">
            {post.category}
          </span>
          <span className="flex items-center mr-4">
            <FontAwesomeIcon icon={faUser} className="mr-1 text-xs" />
            {post.author}
          </span>
          <span className="flex items-center mr-4">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1 text-xs" />
            {post.date}
          </span>
          <span className="flex items-center">
            <FontAwesomeIcon icon={faClock} className="mr-1 text-xs" />
            {post.readTime}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        {/* Featured Image */}
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
        />
      </div>

      {/* Article Content */}
      <div className="prose max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-12">
        {post.tags.map(tag => (
          <span 
            key={tag} 
            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-between items-center mb-12 border-t border-b border-gray-200 py-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
          >
            <FontAwesomeIcon icon={faHeart} />
            <span>{likeCount}</span>
          </button>
          
          <button 
            onClick={handleBookmark}
            className={`${isBookmarked ? 'text-indigo-600' : 'text-gray-500'} hover:text-indigo-600`}
          >
            <FontAwesomeIcon icon={faBookmark} />
          </button>
        </div>
        
        <button 
          onClick={handleShare}
          className="text-gray-500 hover:text-indigo-600"
        >
          <FontAwesomeIcon icon={faShareAlt} className="mr-1" />
          Share
        </button>
      </div>

      {/* Author Bio */}
      <div className="bg-gray-50 p-6 rounded-lg mb-12">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-gray-300 mr-4 overflow-hidden">
            {/* Author image would go here */}
          </div>
          <div>
            <h3 className="font-bold text-lg">{post.author}</h3>
            <p className="text-gray-600">Tech Writer & AI Enthusiast</p>
            <p className="text-gray-500 text-sm mt-1">
              {post.author} has written 42 articles on technology and innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => (
              <div key={relatedPost.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={relatedPost.image} 
                  alt={relatedPost.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                      {relatedPost.category}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faClock} className="mr-1 text-xs" />
                      {relatedPost.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{relatedPost.title}</h3>
                  <Link 
                    to={`/post/${relatedPost.id}`} 
                    className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center"
                  >
                    Read More <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-sm" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Discussion ({comments.length})
          </h2>
          <button 
            onClick={() => setShowCommentForm(!showCommentForm)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            {showCommentForm ? 'Cancel' : 'Add Comment'}
          </button>
        </div>

        {/* Comment Form */}
        {showCommentForm && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                {currentUser.initials}
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="Share your thoughts..."
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleCommentSubmit}
                    disabled={!newComment.trim()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                    {comment.author.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{comment.author.name}</h4>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleLikeComment(comment.id)}
                          className={`flex items-center gap-1 ${comment.liked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                        >
                          <FontAwesomeIcon icon={faHeart} size="sm" />
                          <span className="text-sm">{comment.likes}</span>
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <FontAwesomeIcon icon={faEllipsisV} size="sm" />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">{comment.text}</p>

                    {/* Reply Section */}
                    <div className="mt-3">
                      <button
                        onClick={() => setActiveReplyId(activeReplyId === comment.id ? null : comment.id)}
                        className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      >
                        <FontAwesomeIcon icon={faReply} size="sm" />
                        Reply
                      </button>

                      {activeReplyId === comment.id && (
                        <div className="mt-2 pl-3 border-l-2 border-gray-200">
                          <textarea
                            placeholder="Write your reply..."
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent text-sm"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              onClick={() => setActiveReplyId(null)}
                              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleReplySubmit(comment.id)}
                              disabled={!replyText.trim()}
                              className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors"
                            >
                              Post Reply
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Nested Replies */}
                      {comment.replies.length > 0 && (
                        <div className="mt-3 space-y-3 pl-3 border-l-2 border-gray-200">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="pt-3">
                              <div className="flex items-start gap-2">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-medium">
                                  {reply.author.initials}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="text-sm font-medium text-gray-900">{reply.author.name}</h4>
                                      <span className="text-xs text-gray-500">
                                        {new Date(reply.date).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'short',
                                          day: 'numeric'
                                        })}
                                      </span>
                                    </div>
                                    <button
                                      onClick={() => handleLikeReply(comment.id, reply.id)}
                                      className={`flex items-center gap-1 ${reply.liked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                                    >
                                      <FontAwesomeIcon icon={faHeart} size="xs" />
                                      <span className="text-xs">{reply.likes}</span>
                                    </button>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-700">{reply.text}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;