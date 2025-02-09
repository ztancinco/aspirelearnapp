import { useState, useCallback, useMemo } from 'react';
import CourseRepository from '@/app/api/repositories/CourseRepository';
import { Course } from '@/app/api/interface/Course';
import useUsers from '@/app/hooks/useUsers';
import { User } from '@/app/api/interface/User';
import { CourseFormData } from '@/app/components/form/course/interface/course_form_data';

export default function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [instructors, setInstructors] = useState<User[]>([]);
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
    } catch (err) {
      handleError('Failed to fetch courses', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCourse = useCallback(
    async (id: number): Promise<Course | null> => {
      const cachedCourse = courses.find((course) => course.id === id);
      if (cachedCourse) return cachedCourse;

      setLoading(true);
      try {
        return await CourseRepository.getCourse(id);
      } catch (err) {
        handleError('Failed to fetch course', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [courses]
  );

  const addCourse = useCallback(
    async (courseData: Omit<CourseFormData, 'id'>) => {
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
    async (id: number, updatedCourseData: Partial<Course>) => {
      setLoading(true);
      try {
        const existingCourse = courses.find((course) => course.id === id);
        if (!existingCourse) throw new Error('Course not found');
        const updatedCourse = await CourseRepository.updateCourse(id, { ...existingCourse, ...updatedCourseData });
        setCourses((prevCourses) =>
          prevCourses.map((course) => (course.id === id ? { ...course, ...updatedCourse } : course))
        );
      } catch (err) {
        handleError('Failed to update course', err);
      } finally {
        setLoading(false);
      }
    },
    [courses]
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
      const filteredInstructors: User[] = data.filter((user: User) => user.role?.toLocaleUpperCase() === 'INSTRUCTOR');
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
