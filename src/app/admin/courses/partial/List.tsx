'use client';

import { useMemo } from 'react';
import { Course } from '@/app/api/interface/Course';
import CustomDataTable from '@/app/components/CustomDataTable';
import { PlusCircleIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

import { useRouter } from 'next/navigation';
import useCourses from '@/app/hooks/useCourses';

interface CourseListProps {
  courses: Course[];
  onFetchCourses: () => void; 
}

export default function List({ courses = [], onFetchCourses }: CourseListProps) {
  const router = useRouter();
  const { deleteCourse } = useCourses();

  const columns = useMemo(
    () => [
      { key: 'title', label: 'Course Title' },
      { key: 'instructor', label: 'Instructor' },
      { key: 'lessons', label: 'Lessons' },
      { key: 'quizzes', label: 'quizzes' },
    ],
    []
  )

  const handleEditClick = (courseId: number) => {
    router.push(`/admin/courses/edit/${courseId}`);
  }

  const handleDeleteClick = async (courseId: number) => {
    if (courseId === undefined || isNaN(Number(courseId))) return;
    if (confirm(`Are you sure you want to delete the course?`)) {
      try {
        await deleteCourse(courseId);
        onFetchCourses();
      } catch (err) {
        console.error('Failed to delete course:', err);
        alert('Failed to delete course. Please try again.');
      }
    }
  }

  const formatInstructorFullName = (course: Course) => {
    const instructor = course.instructor;
    if (!instructor || typeof instructor === 'string') {
      return null;
    }

    return `${instructor.first_name}, ${instructor.last_name}`;
  }

  const coursesRecord = courses.map((course: Course) => ({
    id: course.id,
    title: course.title,
    instructor: formatInstructorFullName(course),
    lessons: Array.isArray(course.lessons) ? course.lessons.length : 0,
    quizzes: Array.isArray(course.quizzes) ? course.quizzes.length : 0,
  }))

  return (
    <section className="mt-8 bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-teal-800">Courses</h2>
        <button
          onClick={() => router.push('/admin/courses/create')}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-blue-500"
        >
          <PlusCircleIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-6 overflow-x-auto">
        <CustomDataTable
          data={coursesRecord}
          columns={columns}
          actions={(row) => (
          <div className="flex space-x-2">
            <button onClick={() => row.id && handleEditClick(row.id)} className="text-blue-500 hover:text-blue-700">
              <PencilIcon className="h-5 w-5" />
            </button>
            <button onClick={() => row.id && handleDeleteClick(row.id)} className="text-red-500 hover:text-red-700">
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        )}
        />
      </div>
    </section>
  );
}
