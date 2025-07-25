import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Preloader from '../../ui/Preloader';
import api from '../../../api/axios';
import { FiArrowLeft } from 'react-icons/fi';

const PostDetails = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await api.get(`/posts/slug/${slug}`);
                setPost(res.data.data);
            } catch (error) {
                console.error('Failed to fetch post details', error);
            }
        };

        fetchPost();
    }, [slug]);

    if (!post) return <Preloader />;

    return (

        <div className="container mx-auto py-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Header with Add button */}
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Post Details</h2>
                       <NavLink to={'/admin/posts'}
                                
                                className="mt-2 sm:mt-0 flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors no-underline"
                              >
                                <FiArrowLeft className="mr-2" />
                                Back
                              </NavLink>
                </div>
                <div className="px-4">
                    
                    {post.image && <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/${post.image}`} className="w-100 my-5" alt="" />}
                    <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: post.description }} />
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
