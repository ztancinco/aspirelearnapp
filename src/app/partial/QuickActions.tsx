'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircleIcon, UserGroupIcon, BookOpenIcon } from '@heroicons/react/24/solid';

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    { 
      label: 'Add New Course', 
      icon: <PlusCircleIcon className="h-5 w-5 mr-2" />, 
      color: 'blue', 
      onClick: () => router.push('/courses/create') 
    },
    { 
      label: 'View Courses', 
      icon: <BookOpenIcon className="h-5 w-5 mr-2" />, 
      color: 'green', 
      onClick: () => router.push('/courses') 
    },
    { 
      label: 'Manage Users', 
      icon: <UserGroupIcon className="h-5 w-5 mr-2" />, 
      color: 'yellow', 
      onClick: () => router.push('/users') 
    },
  ];

  const colorClasses: { [key: string]: string } = {
    blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    green: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    yellow: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-teal-800 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`${colorClasses[action.color]} flex items-center justify-center text-white py-4 px-6 rounded-lg shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-4`}
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </section>
  );
}
