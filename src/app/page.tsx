import React from 'react';
import WelcomeHeader from './partial/WelcomeHeader';
import QuickActions from './partial/QuickActions';
import DashLearnLayout from './components/DashLearnLayout';
import DashboardOverview from './partial/DashboardOverview';
import RecentActivities from './partial/RecentActivities';
import TopPerformingCourses from './partial/TopPerformingCourses';

export default function AdminHome() {
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
