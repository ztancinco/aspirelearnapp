import { IQuiz } from '@/app/api/interface/IQuiz';
import { ILesson } from '@/app/api/interface/ILesson';
import { ICourse }  from '@/app/api/interface/ICourse';

export interface ICourseFormData {
  course?: ICourse
  title: string;
  description: string;
  instructor: string;
  status: 'Active' | 'Inactive';
  lessons: ILesson[];
  quizzes: IQuiz[];
}