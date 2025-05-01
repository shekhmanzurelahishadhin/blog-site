import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { FiEdit2, FiEye, FiPlus, FiTrash2 } from 'react-icons/fi'
import ExportButtons from '../../ui/ExportButtons';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    meta: '',
    description: '',
    category_id: '',
    image: null,
    active: false,
    published_at: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [postsSearch, setPostsSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [body, setBody] = useState('<p>Initial content</p>');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCreate = () => {
    setIsModalOpen(false);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleEdit = (post) => {
    setIsModalOpen(true);
  }
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this post?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
  }
  // Handle Search
  useEffect(() => {
    if (!searchTerm) {
      setPostsSearch(posts);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPostsSearch(filtered);
    }
  }, [searchTerm, posts]);

  //Handle Form Input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    //Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const columns = [
    {
      name: '#',
      cell: (row, index) => index + 1,
      width: '5%'
    },
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
      width: '25%',
    },
    {
      name: 'Category',
      selector: row => row.category?.name || 'N/A',
      sortable: true,
      width: '15%',
    },
    {
      name: 'Status',
      cell: row => (
        <span className={`px-2 py-1 text-xs rounded-full ${row.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
          {row.active ? 'Active' : 'Inactive'}
        </span>
      ),
      width: '10%',
    },
    {
      name: 'Published At',
      cell: row => row.published_at ? moment(row.published_at).format('MMM D, YYYY') : 'Draft',
      width: '15%',
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex space-x-2">
          <button onClick={() => window.open(`/posts/${row.slug}`, '_blank')} className="text-blue-600 hover:text-blue-900">
            <FiEye />
          </button>
          <button onClick={() => handleEdit(row)} className="text-indigo-600 hover:text-indigo-900">
            <FiEdit2 />
          </button>
          <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-900">
            <FiTrash2 />
          </button>
        </div>
      ),
      width: '15%',
      ignoreRowClick: true,
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Posts</h2>
          <button
            onClick={handleCreate}
            className="mt-2 sm:mt-0 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <FiPlus className="mr-2" />
            Add New
          </button>
        </div>
        {/* Posts Table */}
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={postsSearch}
            pagination
            highlightOnHover
            pointerOnHover
            progressPending={isLoading}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
            subHeader
            defaultSortFieldId="published_at"
            defaultSortAsc={false}
            subHeaderComponent={
              <div className="flex justify-between items-center w-full">
                <ExportButtons
                  data={postsSearch}
                  fileName="posts"
                  columns={[
                    { name: 'Title', selector: 'title' },
                    { name: 'Slug', selector: 'slug' },
                    { name: 'Category', selector: row => row.category?.name || 'N/A' },
                    { name: 'Status', selector: row => row.active ? 'Active' : 'Inactive' },
                    { name: 'Published At', selector: row => row.published_at || 'Draft' }
                  ]}
                />
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="px-2 py-2 mt-2 border rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}
