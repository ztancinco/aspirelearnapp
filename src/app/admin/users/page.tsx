'use client';

import { useEffect } from 'react';
import DashLearnLayout from '../../components/DashLearnLayout';
import HeaderList from '../../components/HeaderList';
import List from './partial/List';
import Loader from '../../components/Loader';
import useUsers from '../../hooks/useUsers';

export default function ManageUsers() {
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
