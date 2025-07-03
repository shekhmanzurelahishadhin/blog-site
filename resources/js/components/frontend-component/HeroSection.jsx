import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const HeroSection = () => {
    const [latestPost, setLatestPost] = useState(null);
    const [loading, setLoading] = useState(true);

    // Extract plain text excerpt from HTML description
    const excerpt = latestPost
        ? (() => {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = latestPost.description || "";
            return tempDiv.textContent?.substring(0, 150) + "...";
        })()
        : "";

    useEffect(() => {
        fetch("http://localhost:8000/api/post-list?limit=1&sort=desc")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setLatestPost(data[0]);
                } else if (data.data && data.data.length > 0) {
                    setLatestPost(data.data[0]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching latest post:", err);
                setLoading(false);
            });
    }, []);

    return (
        <section className="hero-pattern py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center">
                    {/* Text Section */}
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        {loading ? (
                            <>
                                <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse mb-6"></div>
                                <div className="flex gap-4">
                                    <div className="h-10 w-28 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-10 w-28 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                                    {latestPost.title}
                                </h1>
                                <p className="text-lg text-gray-600 mb-8">{excerpt}</p>
                                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                    <NavLink
                                        to={`/posts/${latestPost.slug}`}
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-md"
                                    >
                                        Read Now
                                    </NavLink>
                                    <a
                                        href="/popular"
                                        className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md"
                                    >
                                        Popular Posts
                                    </a>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Image Section */}
                    <div className="md:w-1/2 flex justify-center">
                        {loading ? (
                            <div className="w-full max-w-md h-64 bg-gray-200 rounded-lg animate-pulse"></div>
                        ) : (
                            <img
                                src={`${import.meta.env.VITE_BACKEND_URL}/storage/${latestPost.image}`}
                                alt={latestPost.title}
                                className="rounded-lg shadow-xl floating max-w-md w-full h-auto"
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
