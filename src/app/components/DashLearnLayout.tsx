"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/components/sidebar/SideBar';
import AdminSidebar from '@/app/components/sidebar/AdminSideBar';
import useAuth  from '@/app/hooks/useAuth';

export default function DashLearnLayout({ children }: { children: React.ReactNode }) {
  const { getUserData } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (getUserData) {
      try {
        setIsAdmin(getUserData.roles?.includes('Admin'));
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, [getUserData]);

  return (
    <main className="flex flex-1">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 h-full">
        {isAdmin ? <AdminSidebar /> : <Sidebar />}
      </aside>
      {/* Main Content */}
      <section className="flex-1 p-4 overflow-auto">
        <div className="max-w-8xl mx-auto px-2">{children}</div>
      </section>
    </main>
  );
}
