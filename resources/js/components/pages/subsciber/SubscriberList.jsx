import React, { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../api/axios';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import ExportButtons from "../../ui/ExportButtons";

export default function SubscriberList() {
    const [subscribers, setSubscribers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSubscribers, setFilteredSubscribers] = useState([]);

    // Fetch contact subscribers
    const fetchMessages = async () => {
        try {
            setIsLoading(true);
            const res = await api.get('/subscriber-list');
            setSubscribers(res.data.data);
            setFilteredSubscribers(res.data.data);
        } catch (error) {
            toast.error('Failed to subscriber');
            localStorage.removeItem('auth_token');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredSubscribers(subscribers);
        } else {
            const filtered = subscribers.filter(msg =>
                msg.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSubscribers(filtered);
        }
    }, [searchTerm, subscribers]);

    // Delete message
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this message?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/destroy-subscriber/${id}`);
                toast.success('Message deleted successfully');
                setSubscribers(prev => prev.filter(msg => msg.id !== id));
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to delete message');
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
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            width: '85%',
        },
        {
            name: 'Actions',
            cell: row => (
                <button
                    onClick={() => handleDelete(row.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete Message"
                >
                    <FiTrash2 />
                </button>
            ),
            width: '10%',
            ignoreRowClick: true,
        }
    ];

    return (
        <div className="container mx-auto py-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Subscriber List</h2>

                </div>

                <div className="overflow-x-auto">
                    <DataTable
                        columns={columns}
                        data={filteredSubscribers}
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
                                    data={filteredSubscribers}
                                    fileName="subscriber"
                                    columns={[
                                        {name: 'email', selector: 'email'},
                                    ]}
                                />
                                <input
                                    type="text"
                                    placeholder="Search subscribers..."
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
