import { useState, useCallback, useMemo } from 'react';
import CourseRepository from '@/app/api/repositories/CourseRepository';
import { ICourse } from '@/app/api/interface/ICourse';
import { ICourseFormData } from '@/app/api/interface/form/ICourseFormData';
import { IUser } from '@/app/api/interface/IUser';
import useUsers from '@/app/hooks/useUsers';

export default function useCourses() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [course, setCourse] = useState<ICourse | null>(null);
  const [instructors, setInstructors] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { fetchUsers } = useUsers();

  const handleError = (message: string, error: unknown) => {
    setError(message);
    console.error(message, error);
  };

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await CourseRepository.getCourses();
      setCourses(data);
      console.log(courses);
    } catch (err) {
      handleError('Failed to fetch courses', err);
    } finally {
      setLoading(false);
    }
  }, [courses]);

  const fetchCourse = useCallback(
    async (id: number): Promise<ICourse | null> => {
      setLoading(true);
      try {
        const course = await CourseRepository.getCourse(id);
        setCourse(course);
        return course;
      } catch (err) {
        handleError('Failed to fetch course', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const addCourse = useCallback(
    async (courseData: Omit<ICourseFormData, 'id'>) => {
      setLoading(true);
      try {
        const newCourse = await CourseRepository.createCourse(courseData);
        setCourses((prevCourses) => [...prevCourses, newCourse]);
      } catch (err) {
        handleError('Failed to add course', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateCourse = useCallback(
    async (id: number, updatedCourseData: Partial<ICourse>) => {
      setLoading(true);
      try {
        if (!course) throw Error("Course not found");
        const updatedCourse = await CourseRepository.updateCourse(id, { ...course, ...updatedCourseData });
        setCourses((prevCourses) =>
          prevCourses.map((course) => (course.id === id ? { ...course, ...updatedCourse } : course))
        );
      } catch (err) {
        handleError('Failed to update course', err);
      } finally {
        setLoading(false);
      }
    },
    [course]
  );

  const deleteCourse = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        await CourseRepository.deleteCourse(id);
        setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
      } catch (err) {
        handleError('Failed to delete course', err);
      } finally {
        setLoading(false);
      }
    },
    [setCourses]
  );

  const fetchInstructors = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      const filteredInstructors: IUser[] = data.filter((user: IUser) => user.role?.toLocaleUpperCase() === 'INSTRUCTOR');
      setInstructors(filteredInstructors);
    } catch (err) {
      handleError('Failed to fetch instructors', err);
    } finally {
      setLoading(false);
    }
  }, [fetchUsers]);

  const getCourses = useMemo(() => courses, [courses]);
  const getInstructors = useMemo(() => instructors, [instructors]);

  return {
    courses,
    loading,
    error,
    fetchCourses,
    fetchCourse,
    fetchInstructors,
    getCourses,
    getInstructors,
    addCourse,
    updateCourse,
    deleteCourse,
  };
}
