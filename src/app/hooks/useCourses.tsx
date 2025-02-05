import { useState, useCallback } from 'react';
import CourseRepository from '@/app/api/repositories/CourseRepository';
import { Course } from '@/app/api/interface/Course';

export default function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to handle errors
  const handleError = (message: string, error: unknown) => {
    setError(message);
    console.error(message, error);
  };

  // Fetch all courses
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

  // Fetch a single course by ID
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

  // Add a new course
  const addCourse = useCallback(
    async (courseData: Omit<Course, 'id'>) => {
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

  // Update an existing course
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

  // Delete a course
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
