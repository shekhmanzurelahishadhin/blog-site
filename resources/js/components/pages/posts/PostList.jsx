import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiEye } from 'react-icons/fi';
import { FaFileExcel, FaFileCsv, FaFilePdf } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../../api/axios";
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import ExportButtons from '../../ui/ExportButtons';
import moment from 'moment';
import ImageDropzone from '../../ui/ImageDropzone';
import RichTextEditor from '../../ui/RichTextEditor';
import Select from 'react-select';
import { NavLink } from 'react-router-dom';


export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    meta: '',
    description: '',
    category_ids: '',
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
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleImageChange = (file) => {
    setFormData({
      ...formData,
      image: file
    });
    setUploadedFile(file);
    // you can now upload this to Laravel backend
  };

  // Convert categories to React Select format
  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name
  }));

  // Handle selection change
  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
    setFormData({
      ...formData,
      category_ids: selectedOptions.map(option => option.value)
    });


    // Clear error when user types
    if (errors.category_ids) {
      setErrors({
        ...errors,
        'category_ids': null
      });
    }
  };
  // Fetch posts and categories from Laravel API
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [postsRes, categoriesRes] = await Promise.all([
        api.get('/posts'),
        api.get('/categories')
      ]);
      setPosts(postsRes.data.data);
      setPostsSearch(postsRes.data.data);
      setCategories(categoriesRes.data.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle search
  useEffect(() => {
    if (!searchTerm) {
      setPostsSearch(posts);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPostsSearch(filtered);
    }
  }, [searchTerm, posts]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Handle description change (for rich text editor)
  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      description: value
    });
    // Clear error when user types
    if (errors.description) {
      setErrors({
        ...errors,
        'description': null
      });
    }
  };

  // Generate slug from title
  const generateSlug = (title) => {
    if (errors.slug) {
      setErrors({
        ...errors,
        'slug': null
      });
    }

    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setIsLoading(true);

    // Validate form
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
    if (!formData.meta.trim()) newErrors.meta = 'Meta is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category_ids || formData.category_ids.length === 0) {
      newErrors.category_ids = 'At least one category is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('slug', formData.slug);
      formPayload.append('meta', formData.meta);
      formPayload.append('description', formData.description);
      formData.category_ids.forEach(id => {
        formPayload.append('category_ids[]', id);
      });
      formPayload.append('published_at', formData.published_at);
      formPayload.append('active', formData.active ? '1' : '0'); // fixed

      if (formData.image instanceof File) {
        formPayload.append('image', formData.image);
      }

      let updatedPost;

      if (currentPost) {
        formPayload.append('_method', 'PUT');
        // Update existing post
        const res = await api.post(`/posts/${currentPost.id}`, formPayload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        updatedPost = res.data.data;
        toast.success('Post updated successfully');

        // Update the post in state
        setPosts(prev =>
          prev.map(post => post.id === updatedPost.id ? updatedPost : post)
        );
      } else {
        // Create new post
        const res = await api.post('/posts', formPayload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        updatedPost = res.data.data;
        toast.success('Post created successfully');

        // Add new post to the state
        setPosts(prev => [updatedPost, ...prev]);
      }

      handleCloseModal();
    } catch (error) {
      toast.error(error);
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        toast.error(error.response?.data?.message || 'Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete post
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

    if (result.isConfirmed) {
      try {
        await api.delete(`/posts/${id}`);
        toast.success('Post deleted successfully');
        setPosts(prev => prev.filter(post => post.id !== id));
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete post');
      }
    }
  };

  // Open modal for editing
  const handleEdit = (post) => {
    setCurrentPost(post);
    setFormData({
      title: post.title || '',
      slug: post.slug || '',
      meta: post.meta || '',
      description: post.description || '',
      category_ids: Array.isArray(post.categories) ? post.categories.map(cat => cat.id) : [],
      image: post.image, // Reset on edit
      active: post.active, //  0/1
      published_at: post.published_at ? moment(post.published_at).format('YYYY-MM-DD') : ''
    });
    setSelectedCategories(
      post.categories?.map(cat => ({
        value: cat.id,
        label: cat.name
      })) || []
    );
    setIsModalOpen(true);
  };

  // Open modal for creating
  const handleCreate = () => {
    setCurrentPost(null);
    setFormData({
      title: '',
      slug: '',
      meta: '',
      description: '',
      category_ids: '',
      image: null,
      active: false,
      published_at: ''
    });
    setErrors({});
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
    setFormData({
      title: '',
      slug: '',
      meta: '',
      description: '',
      category_ids: '',
      image: null,
      active: false,
      published_at: ''
    });
    setUploadedFile(null);
    setSelectedCategories([]);
    setErrors({});
  };

  // Columns for DataTable
  const columns = [
    {
      name: '#',
      cell: (row, index) => index + 1,
      width: '5%',
    },
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
      width: '30%',
    },
    {
      name: 'Category',
      selector: row =>
        Array.isArray(row.categories) && row.categories.length > 0
          ? row.categories.map(cat => cat.name).join(', ')
          : 'N/A',
      sortable: true,
      width: '25%',
    },
    {
      name: 'Views',
      selector: row => row.views,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Status',
      cell: row => (
        <span className={`px-2 py-1 text-xs rounded-full ${row.active == 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
          {row.active == 1 ? 'Active' : 'Inactive'}
        </span>
      ),
      width: '10%',
    },
    {
      name: 'Published At',
      cell: row => row.published_at ? moment(row.published_at).format('MMM D, YYYY') : 'Draft',
      width: '10%',
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex space-x-2">
          <NavLink
            to={`/admin/posts/${row.slug}`}
            className="text-blue-600 hover:text-blue-900"
          >
            <FiEye />
          </NavLink>
          <button onClick={() => handleEdit(row)} className="text-indigo-600 hover:text-indigo-900">
            <FiEdit2 />
          </button>
          <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-900">
            <FiTrash2 />
          </button>
        </div>
      ),
      width: '10%',
      ignoreRowClick: true,
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header with Add button */}
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
                          {name: 'Title', selector: 'title'},
                          {name: 'Slug', selector: 'slug'},
                          {name: 'Views', selector: 'views'},
                          {
                              name: 'Category',
                              selector: row =>
                                  Array.isArray(row.categories) && row.categories.length > 0
                                      ? row.categories.map(cat => cat.name).join(', ')
                                      : 'N/A'
                          },
                          {name: 'Status', selector: row => row.active ? 'Active' : 'Inactive'},
                          {name: 'Published At', selector: row => row.published_at || 'Draft'}
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

      {/* Add/Edit Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold">
                {currentPost ? 'Edit Post' : 'Add New Post'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={(e) => {
                      handleInputChange(e);
                      // Auto-generate slug when title changes (only for new posts)
                      // if (!currentPost) {
                        setFormData({
                          ...formData,
                          title: e.target.value,
                          slug: generateSlug(e.target.value)
                        });
                      // }
                    }}
                    className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>
                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.slug ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="category_ids" className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <Select
                    isMulti
                    name="category_ids"
                    options={categoryOptions}
                    value={selectedCategories}
                    onChange={handleCategoryChange}
                    className={`react-select-container ${errors.category_ids ? 'has-error' : ''}`}
                    classNamePrefix="react-select"
                    placeholder="Select categories..."
                    closeMenuOnSelect={false}
                  />
                  {errors.category_ids && (
                    <p className="mt-1 text-sm text-red-600">{errors.category_ids}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="published_at" className="block text-sm font-medium text-gray-700 mb-1">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    id="published_at"
                    name="published_at"
                    value={formData.published_at}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="meta" className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="meta"
                  name="meta"
                  value={formData.meta}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-3 py-2 border rounded-md ${errors.meta ? 'border-red-500' : 'border-gray-300'}`}
                ></textarea>
                {errors.meta && <p className="mt-1 text-sm text-red-600">{errors.meta}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Image
                </label>
                <ImageDropzone initialImage={formData.image} onImageChange={handleImageChange} />
                {/*
                {uploadedFile && (
                  <p className="mt-4 text-green-600">File ready to upload: {uploadedFile.name}</p>
                )} */}
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                {/* <RichTextEditor content={formData.description} onChange={handleDescriptionChange} className="min-h-[300px] p-4 bg-white focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none" /> */}
                <RichTextEditor
                  content={formData.description}
                  onChange={handleDescriptionChange}
                  className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              <div className="flex items-center mb-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, active: !formData.active })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${formData.active ? 'bg-indigo-600' : 'bg-gray-200'}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.active ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </button>
                <label htmlFor="active" className="ml-3 text-sm font-medium text-gray-700">
                  {formData.active ? 'Active' : 'Inactive'}
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {currentPost ? 'Updating...' : 'Creating...'}
                    </span>
                  ) : (
                    currentPost ? 'Update Post' : 'Create Post'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
