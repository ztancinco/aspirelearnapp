'use client';

import { useEffect } from 'react';
import HeaderList from '@/app/components/HeaderList';
import CoursesList from '@/app/admin/courses/partial/List';
import useCourses from '@/app/hooks/useCourses'
import DashLearnLayout from '@/app/components/DashLearnLayout';

export default function Courses() {
  const { courses, fetchCourses } = useCourses();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <>
      <DashLearnLayout>
        <div className="max-w-8xl mx-auto px-2">
          <HeaderList 
            title="Manage Courses" 
            description="View, edit, and manage all the courses in the LMS."
          />
          <CoursesList courses={courses} onFetchCourses={fetchCourses} />
        </div>
       </DashLearnLayout>
    </>
  );
}
