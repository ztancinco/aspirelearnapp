import React from 'react';
import WelcomeHeader from '@/app/admin/partial/WelcomeHeader';
import QuickActions from '@/app/admin/partial/QuickActions';
import DashLearnLayout from '@/app/components/DashLearnLayout';
import DashboardOverview from '@/app/admin/partial/DashboardOverview';
import RecentActivities from '@/app/admin/partial/RecentActivities';
import TopPerformingCourses from '@/app/admin/partial/TopPerformingCourses';

export default function AdminDashboard() {
  return (
    <>
      <DashLearnLayout>
        <WelcomeHeader />
        <DashboardOverview />
        <QuickActions />
        <div className="flex flex-wrap">
          <div className="w-full ml-0 pl-0 sm:w-1/2 p-4">
            <RecentActivities />
          </div>
          <div className="w-full ml-0 pl-0 mr-0 sm:w-1/2 p-4">
            <TopPerformingCourses />
          </div>
        </div>
      </DashLearnLayout>
    </>
  );
}
