// src/components/HeroSection.jsx
const HeroSection = () => (
  <section className="hero-pattern py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Nourish Your <span className="gradient-text">Curious Mind</span> With Thoughtful Content
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Explore insightful articles on technology, personal growth, and creativity.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#" className="px-6 py-3 bg-indigo-600 text-white rounded-md">Start Reading</a>
            <a href="#" className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md">Popular Posts</a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3..."
            alt="Person reading"
            className="rounded-lg shadow-xl floating max-w-md w-full h-auto"
          />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
