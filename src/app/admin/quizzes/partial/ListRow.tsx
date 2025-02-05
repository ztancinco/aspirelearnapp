import { Course } from '@/app/api/interface/course';
import { useRouter } from 'next/navigation';

interface CourseProps {
  course: Course;
  onDelete: (id: number) => void;
}

export default function ListRow({ course, onDelete }: CourseProps) {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/courses/edit/${course.id}`);
  };

  const handleDeleteClick = async () => {
    if (course.id === undefined || isNaN(Number(course.id))) return;
    if (confirm(`Are you sure you want to delete the course "${course.title}"?`)) {
      try {
        await onDelete(course.id);
      } catch (err) {
        console.error('Failed to delete course:', err);
        alert('Failed to delete course. Please try again.');
      }
    }
  };

  return (
    <tr key={course.id || course.title}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{course.title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-700">{course.instructor}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
            course.status === 'Active'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {course.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <button
          onClick={handleEditClick}
          className="text-blue-600 hover:text-blue-900 text-sm font-medium mr-4"
        >
          Edit
        </button>
        <button
          onClick={handleDeleteClick}
          className="text-red-600 hover:text-red-900 text-sm font-medium"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
