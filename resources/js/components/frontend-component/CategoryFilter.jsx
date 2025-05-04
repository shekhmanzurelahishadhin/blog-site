import React from 'react'

const CategoryFilter = () => {
  // Static category data - will be replaced with API data later
  const categories = [
    { id: 1, name: 'Technology', slug: 'technology' },
    { id: 2, name: 'Travel', slug: 'travel' },
    { id: 3, name: 'Food', slug: 'food' },
    { id: 4, name: 'Lifestyle', slug: 'lifestyle' },
    { id: 5, name: 'Business', slug: 'business' },
  ];

  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Categories</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${!activeCategory ? 'bg-blue-100 text-blue-600 category-active' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeCategory === category.id ? 'bg-blue-100 text-blue-600 category-active' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
