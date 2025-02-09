'use client';

import { useMemo } from 'react';
import { User } from '@/app/api/interface/User';
import CustomDataTable from '@/app/components/CustomDataTable';
import { PlusCircleIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import useUsers from '@/app/hooks/useUsers';

interface UsersListProps {
  users: User[];
  onFetchUsers: () => void;
}

export default function List({ users = [], onFetchUsers }: UsersListProps) {
  const router = useRouter();
  const { deleteUser } = useUsers();

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
  };

  const handleDeleteClick = async (userId: number) => {
    if (userId === undefined || isNaN(Number(userId))) return;
    if (confirm(`Are you sure you want to delete this user?`)) {
      try {
        await deleteUser(userId);
        onFetchUsers(); // Emit fetchUsers after deletion
      } catch (err) {
        console.error('Failed to delete user:', err);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const usersRecord = users.map((user: User) => ({
    id: user.id,
    fullName: `${user.first_name} ${user.last_name}`,
    email: user.email,
    role: user.role,
    status: user.status,
  }));

  return (
    <section className="mt-8 bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-teal-800">Users</h2>
        <button
          onClick={() => router.push('/admin/users/create')}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-blue-500"
        >
          <PlusCircleIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-6 overflow-x-auto">
        <CustomDataTable
          data={usersRecord}
          columns={columns}
          actions={(row) => (
            <div className="flex space-x-2">
              <button onClick={() => row.id && handleEditClick(row.id)} className="text-blue-500 hover:text-blue-700">
                <PencilIcon className="h-5 w-5" />
              </button>
              <button onClick={() => row.id && handleDeleteClick(row.id)} className="text-red-500 hover:text-red-700">
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        />
      </div>
    </section>
  );
}
