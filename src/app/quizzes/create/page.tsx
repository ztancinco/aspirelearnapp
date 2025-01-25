'use client';

import CourseForm from '@/app/components/form/course/CourseForm';
import useCourses from '../../hooks/useCourses';
import Sidebar from '@/app/components/SideBar';
import { useRouter } from 'next/navigation';

export default function CreateCoursesPage() {
  const { error } = useCourses();
  const router = useRouter();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="flex flex-1">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 h-full">
        <Sidebar />
      </aside>
      {/* Main Content */}
      <section className="flex-1 p-4 overflow-auto">
        <div className="max-w-8xl mx-auto px-2">
        <div className="min-h-screen bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <CourseForm router={router} />
          </div>
        </div>
        </div>
      </section>
    </main>
  );
}
