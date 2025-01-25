
import { Quiz } from '@/app/api/interface/quiz';
import { Control } from 'react-hook-form';
import { CourseFormData } from './course_form_data';

export interface QuizSectionProps {
  quizzes: Quiz[];
  onChange: <T extends keyof Quiz>(index: number, field: T, value: Quiz[T]) => void;
  onDelete: (index: number) => void;
  onAddQuiz: (quizIndex: number) => void;
  onAddQuestion: (quizIndex: number) => void;
  onDeleteQuestion: (quizIndex: number, questionIndex: number) => void;
  onQuestionChange: <T extends keyof Quiz['questions'][0]>(quizIndex: number, questionIndex: number, field: T, value: Quiz['questions'][0][T]) => void;
  control: Control<CourseFormData>;
}