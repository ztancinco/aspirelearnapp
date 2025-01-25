'use client';

import { useEffect } from 'react';
import Loader from '../components/Loader';
import HeaderList from '../components/HeaderList';
import QuizzesList from './partial/List';
import useCourses from '../hooks/useCourses';
import DashLearnLayout from '../components/DashLearnLayout';
import useAuthGuard from '../hooks/useAuthGuard';

export default function Courses() {
  useAuthGuard();
  const { courses, loading, fetchCourses } = useCourses();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <DashLearnLayout>
        <div className="max-w-8xl mx-auto px-2">
          <HeaderList 
            title="Manage Courses" 
            description="View, edit, and manage all the courses in the LMS."
          />
          <QuizzesList courses={courses} />
        </div>
       </DashLearnLayout>
    </>
  );
}
