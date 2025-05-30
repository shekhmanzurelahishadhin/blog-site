// src/components/CategorySlider.jsx
import Skeleton from 'react-loading-skeleton';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const CategorySlider = ({ categories, loading }) => {
  const settings = {
    dots: false, infinite: true, speed: 500,
    slidesToShow: 4, slidesToScroll: 1,
    responsive: [{ breakpoint: 1024, settings: { slidesToShow: 3 } }, { breakpoint: 768, settings: { slidesToShow: 2 } }, { breakpoint: 480, settings: { slidesToShow: 1 } }]
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Explore By <span className="gradient-text">Categories</span></h2>
        <Slider {...settings}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="px-2">
                <div className="bg-white p-6 rounded-lg shadow-md h-full text-center">
                  <Skeleton circle height={40} width={40} className="mx-auto mb-4" />
                  <Skeleton height={20} width={100} className="mx-auto mb-2" />
                  <Skeleton height={14} width={60} className="mx-auto" />
                </div>
              </div>
            ))
            : categories.map((category, index) => (
              <div key={index} className="px-2">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-slow text-center block h-full">
                  <div className="mb-4">
                    <FontAwesomeIcon style={{ color: category.color }} icon={Icons[category.icon]} className="text-3xl" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm">20 Articles</p>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </section>
  );
};

export default CategorySlider;
