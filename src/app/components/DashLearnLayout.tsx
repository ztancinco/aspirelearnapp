'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Sidebar from '@/app/components/sidebar/SideBar';
import AdminSidebar from '@/app/components/sidebar/AdminSideBar';
import Loader from './Loader';
import useAuth from '@/app/hooks/useAuth';

export default function DashLearnLayout({ children }: { children: React.ReactNode }) {
  const { getUserData } = useAuth();
  const [loading, setLoading] = useState(true);

  const isAdmin = useMemo(() => {
    try {
      return getUserData?.roles?.includes('Admin') ?? false;
    } catch (error) {
      console.error('Error parsing userData:', error);
      return false;
    }
  }, [getUserData]);

  useEffect(() => {
    setLoading(false);
  }, [getUserData]);

  if (loading) return  <Loader/>;

  return (
    <main className="flex flex-1">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 h-full">
        {isAdmin ? <AdminSidebar key="admin-sidebar" /> : <Sidebar key="user-sidebar" />}
      </aside>
      {/* Main Content */}
      <section className="flex-1 p-4 overflow-auto">
        <div className="max-w-8xl mx-auto px-2">{children}</div>
      </section>
    </main>
  );
}
