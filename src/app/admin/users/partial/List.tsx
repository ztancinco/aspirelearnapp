'use client';

import { useMemo, useState, useEffect } from 'react';
import { IUser } from '@/app/api/interface/IUser';
import CustomDataTable from '@/app/components/datatable/CustomDataTable';
import { PlusCircleIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import useUsers from '@/app/hooks/useUsers';

interface UsersListProps {
  users: IUser[];
  onFetchUsers: () => void;
}

export default function List({ users = [], onFetchUsers }: UsersListProps) {
  const router = useRouter();
  const { deleteUser } = useUsers();
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(users.length === 0);
    }, [users]);

  const columns = useMemo(
    () => [
      { key: 'fullName', label: 'Full Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      { key: 'status', label: 'Status' },
    ],
    []
  );

  const handleEditClick = (userId: number) => {
    router.push(`/admin/users/edit/${userId}`);
  }

  const handleDeleteClick = async (userId: number) => {
    if (userId === undefined || isNaN(Number(userId))) return;
    if (confirm(`Are you sure you want to delete this user?`)) {
      try {
        await deleteUser(userId);
        onFetchUsers();
      } catch (err) {
        console.error('Failed to delete user:', err);
        alert('Failed to delete user. Please try again.');
      }
    }
  }

  const usersRecord = users.map((user: IUser) => ({
    id: user.id,
    fullName: `${user.first_name} ${user.last_name}`,
    email: user.email,
    role: user.role,
    status: user.is_active ? 'Active' : "Inactive",
    link: `/admin/user/view/${user.id}`
  }));

  return (
    <section className="mt-8 bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-teal-800">Users</h2>
        <button
          onClick={() => router.push('/admin/users/create')}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-blue-500"
        >
          <PlusCircleIcon className="h-5 w-5" />&nbsp;Add user
        </button>
      </div>
      <div className="mt-6 overflow-x-auto">
        <CustomDataTable
          data={usersRecord}
          loading={loading}
          columns={columns}
          actions={(row) => (
            <div className="flex space-x-2">
              <button onClick={() => row.id && handleEditClick(row.id)} className="text-blue-500 hover:text-blue-700" title='Edit user'> 
                <PencilIcon className="h-5 w-5" />
              </button>
              <button onClick={() => row.id && handleDeleteClick(row.id)} className="text-red-500 hover:text-red-700" title='Delete user'>
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        />
      </div>
    </section>
  );
}
