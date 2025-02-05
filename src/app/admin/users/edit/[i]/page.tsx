'use client';

import Loader from '@/app/components/Loader';
import DashLearnLayout from '@/app/components/DashLearnLayout';
import CourseForm from '@/app/components/form/course/CourseForm';
import useCourses from '@/app/hooks/useCourses';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Course } from '@/app/api/interface/course';

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  
  const userId = params.i ? parseInt(params.i as string, 10) : NaN;
  const { fetchCourse, loading, error } = useCourses();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (isNaN(userId)) {
      router.push('/404');
      return;
    }

    const getCourse = async () => {
      try {
        const fetchedCourse = await fetchCourse(userId);
        if (fetchedCourse) {
          setCourse(fetchedCourse);
        } else {
          console.error('Course not found');
        }
      } catch (err) {
        console.error('Error fetching course:', err);
      }
    };

    getCourse();
  }, [userId, fetchCourse, router]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!course) {
    return (
      <DashLearnLayout>
        <div className="text-gray-600 text-center">Course not found</div>
      </DashLearnLayout>
    );
  }

  return (
    <DashLearnLayout>
      <CourseForm router={router} course={course} />
    </DashLearnLayout>
  );
}
