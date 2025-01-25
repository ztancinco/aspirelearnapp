import { useState, useCallback } from 'react';
import axios from '@/lib/axiosConfig';
import { Course } from '../api/interface/course';

export default function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to handle errors
  const handleError = (errorMessage: string, error: unknown) => {
    const errorDetail = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : 'An unexpected error occurred';
    setError(`${errorMessage}: ${errorDetail}`);
  };

  // Fetch all courses
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<Course[]>('/courses');
      setCourses(data);
    } catch (err: unknown) {
      handleError('Failed to fetch courses', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch a single course by ID (checks cache first)
  const fetchCourse = useCallback(
    async (id: number): Promise<Course | null> => {
      const cachedCourse = courses.find((course) => course.id === id);
      if (cachedCourse) return cachedCourse;

      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get<Course>(`/courses/${id}`);
        return data;
      } catch (err: unknown) {
        handleError('Failed to fetch course', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [courses]
  );

  // Add a new course
  const addCourse = async (courseData: Omit<Course, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const { data: newCourse } = await axios.post<Course>('/courses', courseData);
      setCourses((prevCourses) => [...prevCourses, newCourse]);
    } catch (err: unknown) {
      handleError('Failed to add course', err);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing course
  const updateCourse = async (id: number, updatedCourseData: Partial<Course>) => {
    setLoading(true);
    setError(null);
    try {
      const { data: updatedCourse } = await axios.put<Course>(`/courses/${id}`, updatedCourseData);
      setCourses((prevCourses) =>
        prevCourses.map((course) => (course.id === id ? { ...course, ...updatedCourse } : course))
      );
    } catch (err: unknown) {
      handleError('Failed to update course', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a course
  const deleteCourse = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/courses/${id}`);
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
    } catch (err: unknown) {
      handleError('Failed to delete course', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    courses,
    loading,
    error,
    fetchCourses,
    fetchCourse,
    addCourse,
    updateCourse,
    deleteCourse,
  };
}
