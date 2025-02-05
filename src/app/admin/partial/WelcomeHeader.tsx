'use client';

import React from 'react';
import useAuth from '@/app/hooks/useAuth';

export default function WelcomeHeader() {
  const { getUserData } = useAuth();
  return (
    <header className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <h1 className="text-3xl font-semibold text-teal-900">Welcome , { getUserData?.first_name}</h1>
    </header>
  );
}
