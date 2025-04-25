import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiDownload } from 'react-icons/fi';
import { FaFileExcel, FaFileCsv, FaFilePdf } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../../api/axios";
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExportButtons from '../../ui/ExportButtons';



export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [categoriesSearch, setCategoriesSearch] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch categories from Laravel API
    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const res = await api.get('/categories');
            setCategories(res.data.data);
            setCategoriesSearch(res.data.data); // <-- store filtered list separately
        } catch (error) {
            toast.error('Failed to fetch categories');
            localStorage.removeItem('auth_token');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setCategoriesSearch(categories);
        } else {
            const filtered = categories.filter(cat =>
                cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setCategoriesSearch(filtered);
        }
    }, [searchTerm, categories]);

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

    // Generate slug from name
    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validate form
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.slug.trim()) newErrors.slug = 'Slug is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            let updatedCategory;

            if (currentCategory) {
                // Update existing category
                const res = await api.put(`/categories/${currentCategory.id}`, formData);
                updatedCategory = res.data.data;
                toast.success('Category updated successfully');

                // Replace only the updated row in state
                setCategories(prev =>
                    prev.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat)
                );
            } else {
                // Create new category
                const res = await api.post('/categories', formData);
                updatedCategory = res.data.data; // assuming backend returns the new category
                toast.success('Category created successfully');

                // Add new category to the state
                setCategories(prev => [updatedCategory, ...prev]);
            }

            handleCloseModal();
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                toast.error(error.response?.data?.message || 'Something went wrong');
            }
        } finally {
            setIsLoading(false);
        }

    };

    // Handle delete category
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this category?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/categories/${id}`);
                toast.success('Category deleted successfully');
                // Optimistically update state:
                setCategories(prev => prev.filter(cat => cat.id !== id));
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to delete category');
            }
        }
    };

    // Open modal for editing
    const handleEdit = (category) => {
        setCurrentCategory(category);
        setFormData({
            name: category.name,
            slug: category.slug
        });
        setIsModalOpen(true);
    };

    // Open modal for creating
    const handleCreate = () => {
        setCurrentCategory(null);
        setFormData({
            name: '',
            slug: ''
        });
        setErrors({});
        setIsModalOpen(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentCategory(null);
        setFormData({
            name: '',
            slug: ''
        });
        setErrors({});
    };
    const columns = [
        {
            name: '#', // Serial Number Column
            cell: (row, index, column, id) => index + 1, // Serial starts at 1
            width: '60px', // Optional: Adjust width
            grow: 0, // Optional: Prevent column from growing
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            width: '40%', // Adjust width
        },
        {
            name: 'Slug',
            selector: row => row.slug,
            sortable: true,
            width: '40%',
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="flex space-x-2">
                    <button onClick={() => handleEdit(row)} className="text-indigo-600 hover:text-indigo-900">
                        <FiEdit2 />
                    </button>
                    <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-900">
                        <FiTrash2 />
                    </button>
                </div>
            ),
            width: '120px',
            ignoreRowClick: true,
        }
    ];


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Header with Add button */}
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-50 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
                    <button
                        onClick={handleCreate}
                        className="mt-2 sm:mt-0 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        <FiPlus className="mr-2" />
                        Add New
                    </button>
                </div>
                {/* Categories Table */}
                <div className="overflow-x-auto">
                    <DataTable
                        columns={columns}
                        data={categoriesSearch}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        progressPending={isLoading}
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                        subHeader
                        defaultSortFieldId="id"   // Default order by ID
                        defaultSortAsc={false}    // false = DESC, true = ASC
                        subHeaderComponent={
                            <div className="flex justify-between items-center w-full">
                                <ExportButtons
                                    data={categoriesSearch}
                                    fileName="categories"
                                    columns={[
                                        { name: 'Name', selector: 'name' },
                                        { name: 'Slug', selector: 'slug' }
                                    ]}
                                />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="px-2 py-2 mt-2 border rounded-md"
                                    onChange={(e) => {
                                        const value = e.target.value.toLowerCase();
                                        const filtered = categories.filter(cat =>
                                            cat.name.toLowerCase().includes(value) ||
                                            cat.slug.toLowerCase().includes(value)
                                        );
                                        setCategoriesSearch(filtered);
                                    }}
                                />
                            </div>
                        }
                    />

                </div>
            </div>

            {/* Add/Edit Category Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center border-b p-4">
                            <h3 className="text-lg font-semibold">
                                {currentCategory ? 'Edit Data' : 'Add New'}
                            </h3>
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                                <FiX size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        // Auto-generate slug when name changes (only for new categories)
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                            slug: generateSlug(e.target.value)
                                        });
                                    }}
                                    className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>
                            <div className="mb-4">
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
                                            {currentCategory ? 'Updating...' : 'Creating...'}
                                        </span>
                                    ) : (
                                        currentCategory ? 'Update' : 'Create'
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

