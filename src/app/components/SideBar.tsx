'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  HomeIcon,
  BookOpenIcon,
  UserIcon,
  UserGroupIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 h-full bg-teal-700 text-white flex flex-col w-16 sm:w-64 transition-all duration-300 z-50">
      {/* Sidebar Header */}
      <div className="flex items-center h-16 border-b border-gray-700 px-4">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={40}
            height={40}
            className="h-10 w-auto cursor-pointer"
            priority
          />
        </Link>
        <span className="text-lg font-bold ml-4 hidden sm:block">Aspire Learn</span>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 px-2 py-6 space-y-4">
        <Link
          href="/"
          className="flex items-center px-2 py-2 text-gray-300 hover:bg-teal-800 hover:text-white rounded-md"
        >
          <HomeIcon className="h-5 w-5" />
          <span className="ml-3 hidden sm:block">Home</span>
        </Link>
        <Link
          href="/courses"
          className="flex items-center px-2 py-2 text-gray-300 hover:bg-teal-800 hover:text-white rounded-md"
        >
          <BookOpenIcon className="h-5 w-5" />
          <span className="ml-3 hidden sm:block">Courses</span>
        </Link>
        <Link
          href="/quizzes"
          className="flex items-center px-2 py-2 text-gray-300 hover:bg-teal-800 hover:text-white rounded-md"
        >
          <VideoCameraIcon className="h-5 w-5" />
          <span className="ml-3 hidden sm:block">Quizzes</span>
        </Link>
          <Link
          href="/users"
          className="flex items-center px-2 py-2 text-gray-300 hover:bg-teal-800 hover:text-white rounded-md"
        >
          <UserGroupIcon className="h-5 w-5" />
          <span className="ml-3 hidden sm:block">Users</span>
        </Link>
        <Link
          href="#"
          className="flex items-center px-2 py-2 text-gray-300 hover:bg-teal-800 hover:text-white rounded-md"
        >
          <UserIcon className="h-5 w-5" />
          <span className="ml-3 hidden sm:block">Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
