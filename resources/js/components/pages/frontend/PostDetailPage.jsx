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
    faEllipsisV,
    faTags
} from '@fortawesome/free-solid-svg-icons';
import api from '../../../api/axios';
import Preloader from '../../ui/Preloader';
import useAuth from "../../../auth/useAuth";
import {toast} from "react-toastify";

const PostDetailsPage = () => {
    const { slug } = useParams();
    const [post, setPost] = useState([]);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [formData, setFormData] = useState({
        email: ''
    });
    const [errors, setErrors] = useState({});
    const{ subscribe, user } = useAuth();

    // Comment-related state
    const [comments, setComments] = useState([]);

    const [newComment, setNewComment] = useState('');
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [activeReplyId, setActiveReplyId] = useState(null);
    const [replyText, setReplyText] = useState('');

    // Fetch post data
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await api.get(`/posts/${slug}`);
                setPost(res.data.data);
                setLikeCount(res.data.data.likes_count || 0);
            } catch (error) {
                console.error('Failed to fetch post details', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    // Fetch related posts
    useEffect(() => {
        const fetchRelatedPosts = async () => {
            try {
                const res = await api.get(`/posts/related/${slug}`);
                setRelatedPosts(res.data.data);
            } catch (error) {
                console.error('Failed to fetch related posts', error);
            }
        };

        fetchRelatedPosts();
    }, [slug]);

    // Fetch Comments after post is loaded
    useEffect(() => {
        if (!post?.id) return; // wait until post is fetched

        const fetchComments = async () => {
            try {
                const res = await api.get(`/posts/${post.id}/comments`);
                setComments(res.data.data); // Laravel API should return an array of comments
            } catch (error) {
                console.error('Failed to fetch comments', error);
            }
        };

        fetchComments();
    }, [post?.id]);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/category-list');
                setCategories(res.data.data);
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };

        fetchCategories();
    }, []);

    // Comment handlers

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        if (user == null) {
            toast.warning('Please login to comment');
            return;
        }

        try {
            const response = await api.post('/comments', {
                post_id: post?.id,
                text: newComment.trim(),
            });

            if (response.data.status === 'success' || response.data.success) {
                const savedComment = response.data.data; // your Laravel returns comment here

                setComments(prev => [savedComment, ...prev]);
                setNewComment('');
                setShowCommentForm(false);
                // console.log(comments);
                // toast.success('Comment successfully!');
            } else {
                toast.error('Comment failed. Please try again.');
            }
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                toast.error(error.response?.data?.message || 'Comment failed. Please try again.');
            }
        }
    };



    const handleReplySubmit = async (commentId) => {
        if (!replyText.trim()) return;
        if (user == null) {
            toast.warning('Please login to reply');
            return;
        }

        try {
            const response = await api.post(`/comments/${commentId}/reply`, {
                text: replyText.trim(),
            });


            if (response.data.status === 'success' || response.data.success) {
                const updatedComments = comments.map(comment => {

                    if (comment?.id === commentId) {
                        const newReply =  response.data.data;

                        return {
                            ...comment,
                            replies: [...comment?.replies, newReply]
                        };
                    }
                    return comment;
                });

                setComments(updatedComments);
                setReplyText('');
                setActiveReplyId(null);
            } else {
                toast.error('Reply failed. Please try again.');
            }
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                toast.error(error.response?.data?.message || 'Reply failed. Please try again.');
            }
        }
    };

    const handleDeleteComment = async (commentId, type, parentCommentId = null) => {
        try {
            await api.delete(`/comments/${commentId}`);

            if (type === 'comment') {
                // Remove a top-level comment
                setComments(prev => prev.filter(comment => comment.id !== commentId));
            } else if (type === 'reply') {
                // Remove a reply inside a comment
                setComments(prev =>
                    prev.map(comment =>
                        comment.id === parentCommentId
                            ? {
                                ...comment,
                                replies: comment.replies.filter(reply => reply.id !== commentId)
                            }
                            : comment
                    )
                );
            }

            toast.success('Deleted successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete comment');
        }
    };


    const handleLike = async (commentId, parentId = null) => {
        try {
            const { data } = await api.post(`/comments/${commentId}/like`);

            setComments(prev =>
                prev.map(comment => {
                    // If it's a top-level comment
                    if (!parentId && comment.id === commentId) {
                        return {
                            ...comment,
                            likes: data.likes,
                            liked: !comment.liked
                        };
                    }

                    // If it's a reply
                    if (parentId && comment.id === parentId) {
                        return {
                            ...comment,
                            replies: comment.replies.map(reply =>
                                reply.id === commentId
                                    ? { ...reply, likes: data.likes, liked: !reply.liked }
                                    : reply
                            )
                        };
                    }

                    return comment;
                })
            );
        } catch (err) {
            console.error(err);
        }
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
    const getInitials = (name) => {
        if (!name) return '';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    if (loading) {
        return (
            <div className="p-4">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
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
                        <span className="flex items-center mr-4">
                            <FontAwesomeIcon icon={faUser} className="mr-1 text-xs" />
                            {post.user?.name}
                        </span>
                        <span className="flex items-center mr-4">
                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1 text-xs" />
                            {new Date(post.published_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </span>
                    </div>

                    {/* Featured Image */}
                    <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/storage/${post.image}`}
                        alt={post.title}
                        className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
                    />
                </div>

                {/* Article Content */}
                <div className="prose max-w-none mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {post.categories?.map((category) => (
                            <span
                                key={category.id}
                                className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs"
                            >
                                {category.name}
                            </span>
                        ))}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: post.description }} />
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
                            <h3 className="font-bold text-lg">{post.user?.name}</h3>
                            <p className="text-gray-600">Tech Writer & AI Enthusiast</p>
                            <p className="text-gray-500 text-sm mt-1">
                                {post.user?.name} has written 42 articles on technology and innovation.
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
                                        src={`${import.meta.env.VITE_BACKEND_URL}/storage/${relatedPost.image}`}
                                        alt={relatedPost.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <div className="flex items-center text-sm text-gray-500 mb-3">
                                            <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                                                {relatedPost.categories?.[0]?.name || 'Uncategorized'}
                                            </span>

                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{relatedPost.title}</h3>
                                        <Link
                                            to={`/posts/${relatedPost.slug}`}
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
                            Discussion ({comments?.length})
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
                                    {getInitials(user?.name)}
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
                        {comments?.length > 0 ? (
                            // <div>he</div>
                            comments.map((comment) => (
                                <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                                            {getInitials(comment?.user?.name) || 'U'}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{comment?.user?.name}</h4>
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(comment.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleLike(comment.id)}
                                                        className={`flex items-center gap-1 ${comment?.liked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                                                    >
                                                        <FontAwesomeIcon icon={faHeart} size="sm" />
                                                        <span className="text-sm">{comment?.likes}</span>
                                                    </button>

                                                    {/* Show icon only if the logged-in user owns the comment */}
                                                    {comment.user_id === user?.id && (
                                                        <div className="relative">
                                                            <button
                                                                className="text-gray-400 hover:text-gray-600"
                                                                onClick={() => setActiveMenuId(activeMenuId === comment.id ? null : comment.id)}
                                                            >
                                                                <FontAwesomeIcon icon={faEllipsisV} size="sm" />
                                                            </button>

                                                            {/* Dropdown Menu */}
                                                            {activeMenuId === comment.id && (
                                                                <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-md z-10">
                                                                    <button
                                                                        className="block w-full text-left px-3 py-1 text-red-500 hover:bg-gray-100"
                                                                        onClick={() => handleDeleteComment(comment.id,'comment')}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="mt-2 text-gray-700">{comment?.text}</p>

                                            {/* Reply Section */}
                                            <div className="mt-3">
                                                <button
                                                    onClick={() => setActiveReplyId(activeReplyId === comment?.id ? null : comment?.id)}
                                                    className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                                                >
                                                    <FontAwesomeIcon icon={faReply} size="sm" />
                                                    Reply
                                                </button>

                                                {activeReplyId === comment?.id && (
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
                                                {comment?.replies?.length > 0 && (
                                                    <div className="mt-3 space-y-3 pl-3 border-l-2 border-gray-200">
                                                        {comment.replies.map((reply) => (
                                                            <div key={reply.id} className="pt-3">
                                                                <div className="flex items-start gap-2">
                                                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-medium">
                                                                        {getInitials(reply?.user?.name) || 'U'}
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center justify-between">
                                                                            <div>
                                                                                <h4 className="text-sm font-medium text-gray-900">{reply?.user?.name}</h4>
                                                                                <span className="text-xs text-gray-500">
                                                                                    {new Date(reply?.created_at).toLocaleDateString('en-US', {
                                                                                        year: 'numeric',
                                                                                        month: 'short',
                                                                                        day: 'numeric'
                                                                                    })}
                                                                                </span>
                                                                            </div>
                                                                            <div  className="flex items-center gap-2">
                                                                                <button
                                                                                    onClick={() => handleLike(reply.id, comment.id)}
                                                                                    className={`flex items-center gap-1 ${reply?.liked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                                                                                >
                                                                                    <FontAwesomeIcon icon={faHeart} size="xs" />
                                                                                    <span className="text-xs">{reply?.likes}</span>
                                                                                </button>

                                                                                {reply.user_id === user?.id && (
                                                                                    <div className="relative">
                                                                                        <button
                                                                                            className="text-gray-400 hover:text-gray-600"
                                                                                            onClick={() => setActiveMenuId(activeMenuId === reply.id ? null : reply.id)}
                                                                                        >
                                                                                            <FontAwesomeIcon icon={faEllipsisV} size="sm" />
                                                                                        </button>

                                                                                        {/* Dropdown Menu */}
                                                                                        {activeMenuId === reply.id && (
                                                                                            <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-md z-10">
                                                                                                <button
                                                                                                    className="block w-full text-left px-3 py-1 text-red-500 hover:bg-gray-100"
                                                                                                    onClick={() => handleDeleteComment(reply?.id,'reply', reply?.parent_id)}
                                                                                                >
                                                                                                    Delete
                                                                                                </button>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                )}
                                                                            </div>
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

            {/* Sidebar */}
            <div className="md:w-64 lg:w-80 space-y-6">
                {/* Categories Widget */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4">
                        <FontAwesomeIcon icon={faTags} className="text-indigo-600 mr-2" />
                        <h3 className="font-bold text-lg">Categories</h3>
                    </div>
                    <ul className="space-y-2">
                        {categories.map(category => (
                            <li key={category.id}>
                                <Link
                                    to={`/posts?category=${encodeURIComponent(category.name)}`}
                                    className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-colors"
                                >
                                    <span>{category.name}</span>
                                    <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                                        {category.posts_count || 0}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Popular Posts Widget */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-lg mb-4">Popular Posts</h3>
                    <div className="space-y-4">
                        {relatedPosts.slice(0, 3).map(post => (
                            <Link
                                key={post.id}
                                to={`/posts/${post.slug}`}
                                className="block hover:bg-gray-50 p-2 rounded transition-colors"
                            >
                                <h4 className="font-medium text-indigo-600 line-clamp-2">{post.title}</h4>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
                                    {/*<span className="mx-2">•</span>*/}
                                    {/*<span>{post?.published_at}</span>*/}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Newsletter Signup (optional) */}
                <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
                    <p className="text-sm text-gray-600 mb-4">Subscribe to our newsletter for the latest posts</p>
                    <form  onSubmit={submitSubscribeForm} className="space-y-3">
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                                handleInputChange(e);
                                // Auto-generate slug when name changes (only for new categories)
                                setFormData({
                                    email: e.target.value
                                });
                            }}
                            placeholder="Your email address"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent text-sm"
                        />
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostDetailsPage;
