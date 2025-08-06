import React, { useState, useEffect } from 'react';
import { FiTrash2, FiUserPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../api/axios';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import ExportButtons from "../../ui/ExportButtons";

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    // Fetch contact users
    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const res = await api.get('/user-list');
            setUsers(res.data.data);
            setFilteredUsers(res.data.data);
        } catch (error) {
            toast.error('Failed to user');
            localStorage.removeItem('auth_token');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [searchTerm, users]);

    // Delete message
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/destroy-user/${id}`);
                toast.success('Message deleted successfully');
                setUsers(prev => prev.filter(msg => msg.id !== id));
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to delete message');
            }
        }
    };
    // Make Admin
    const handleMakeAdmin = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to make this user Admin?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, make it!'
        });

        if (result.isConfirmed) {
            try {
                const res = await api.post(`/make-admin/${id}`);
                const updatedUser = res.data.data;
                toast.success('Role assign successfully');
                setUsers(prev =>
                    prev.map(user => user.id === updatedUser.id ? updatedUser : user)
                );
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to assign role.');
            }
        }
    };

    const columns = [
        {
            name: '#',
            cell: (row, index) => index + 1,
            width: '5%',
            grow: 0,
        },
        {
            name: 'name',
            selector: row => row.name,
            sortable: true,
            width: '30%',
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            width: '30%',
        },
        {
            name: 'Role',
            cell: row => (
                <span className={`px-2 py-1 text-xs rounded-full ${row.role == 1 ? 'bg-green-100 text-green-800' : 'bg-indigo-100 text-indigo-800'
                }`}>
          {row.role == 1 ? 'Admin' : 'Users'}
        </span>
            ),
            width: '25%',
        },
        {
            name: 'Actions',
            cell: row => (
                row?.role !== 1 && (
                    <div className="flex space-x-2">
                    <button
                        onClick={() => handleMakeAdmin(row.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Make Admin"
                    >
                        <FiUserPlus />
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Message"
                    >
                        <FiTrash2 />
                    </button>
                    </div>
                )
            ),
            width: '10%',
            ignoreRowClick: true,
        }
    ];

    return (
        <div className="container mx-auto py-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Users List</h2>

                </div>

                <div className="overflow-x-auto">
                    <DataTable
                        columns={columns}
                        data={filteredUsers}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        progressPending={isLoading}
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                        subHeader
                        subHeaderComponent={
                            <div className="flex justify-between items-center w-full">
                                <ExportButtons
                                    data={filteredUsers}
                                    fileName="user"
                                    columns={[
                                        {name: 'name', selector: 'name'},
                                        {name: 'email', selector: 'email'},
                                        {name: 'role', selector: 'role'},
                                    ]}
                                />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    className="mt-2 sm:mt-0 px-2 py-2 border rounded-md"
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
}
