import { Quiz } from '@/app/api/interface/quiz';
import { Lesson } from '@/app/api/interface/Lesson';
import { Course }  from '@/app/api/interface/course';

export interface CourseFormData {
  course?: Course
  title: string;
  description: string;
  instructor: string;
  status: 'Active' | 'Inactive';
  lessons: Lesson[];
  quizzes: Quiz[];
}