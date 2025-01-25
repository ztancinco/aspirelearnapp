'use client';

import { useEffect } from 'react';
import DashLearnLayout from '../components/DashLearnLayout';
import HeaderList from '../components/HeaderList';
import List from './partial/List';
import Loader from '../components/Loader';
import useUsers from '../hooks/useUsers';
import useAuthGuard from '../hooks/useAuthGuard';

export default function ManageUsers() {
  useAuthGuard();
  const { users, loading, error, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <DashLearnLayout>
        <div className="max-w-8xl mx-auto px-2">
          <HeaderList 
            title="Manage Users" 
            description="View, edit, and manage all the users in the LMS."
          />
          <List users={users} />
        </div>
       </DashLearnLayout>
    </>
  );
}
