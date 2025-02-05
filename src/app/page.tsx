'use client';

import React from 'react';
import WelcomeHeader from '@/app/admin/partial/WelcomeHeader';
import DashLearnLayout from '@/app/components/DashLearnLayout';

export default function Home() {
  return (
    <>
      <DashLearnLayout>
        <WelcomeHeader />
      </DashLearnLayout>
    </>
  );
}
