'use client';

import Loader from '@/app/components/Loader';
import DashLearnLayout from '@/app/components/DashLearnLayout';
import CourseForm from '@/app/components/form/course/CourseForm';
import useCourses from '@/app/hooks/useCourses';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Course } from '@/app/api/interface/course';

export default function EdidtQuizPage() {
  const params = useParams();
  const router = useRouter();
  
  const courseId = params.i ? parseInt(params.i as string, 10) : NaN;
  const { fetchCourse, loading, error } = useCourses();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (isNaN(courseId)) {
      router.push('/404');
      return;
    }

    const getCourse = async () => {
      try {
        const fetchedCourse = await fetchCourse(courseId);
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
  }, [courseId, fetchCourse, router]);

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
