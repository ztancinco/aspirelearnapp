import React from 'react';

interface Course {
  courseName: string;
  completionRate: number;
  enrolledStudents: number;
}

const topCourses: Course[] = [
  { courseName: 'React for Beginners', completionRate: 95, enrolledStudents: 120 },
  { courseName: 'Advanced Python', completionRate: 92, enrolledStudents: 85 },
  { courseName: 'Introduction to HTML', completionRate: 89, enrolledStudents: 150 },
  { courseName: 'Data Science with Python', completionRate: 97, enrolledStudents: 100 },
  { courseName: 'JavaScript Fundamentals', completionRate: 88, enrolledStudents: 110 },
];

export default function TopPerformingCourses() {
  const sortedCourses = topCourses.sort((a, b) => b.completionRate - a.completionRate);

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm mb-10">
      <h2 className="text-xl font-semibold text-teal-800 mb-4">Top Performing Courses</h2>
      <ul className="divide-y divide-gray-200">
        {sortedCourses.map((course, index) => (
          <li key={index} className="py-4 flex justify-between items-center">
            <div>
              <p className="text-gray-700 font-medium">{course.courseName}</p>
              <p className="text-gray-500 text-sm">Enrolled Students: {course.enrolledStudents}</p>
            </div>
            <span className="text-green-600 text-sm font-semibold">
              {course.completionRate}% Completion
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
