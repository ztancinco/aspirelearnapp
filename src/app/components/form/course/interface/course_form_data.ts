import { Quiz } from '@/app/api/interface/Quiz';
import { Lesson } from '@/app/api/interface/Lesson';
import { Course }  from '@/app/api/interface/Course';

export interface CourseFormData {
  course?: Course
  title: string;
  description: string;
  instructor: string;
  status: 'Active' | 'Inactive';
  lessons: Lesson[];
  quizzes: Quiz[];
}