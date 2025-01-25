'use client';

import CourseForm from '@/app/components/form/course/CourseForm';
import useCourses from '../../hooks/useCourses';
import DashLearnLayout from '@/app/components/DashLearnLayout';
import { useRouter } from 'next/navigation';

export default function CreateCoursesPage() {
  const { error } = useCourses();
  const router = useRouter();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DashLearnLayout>
      <div className="max-w-8xl mx-auto px-2">
        <CourseForm router={router} />
      </div>
    </DashLearnLayout>
  );
}
