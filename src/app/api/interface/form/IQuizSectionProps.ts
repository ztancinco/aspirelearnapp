
import { IQuiz } from '@/app/api/interface/IQuiz';
import { Control } from 'react-hook-form';
import { ICourseFormData } from './ICourseFormData';

export interface IQuizSectionProps {
  quizzes: IQuiz[];
  onChange: <T extends keyof IQuiz>(index: number, field: T, value: IQuiz[T]) => void;
  onDelete: (index: number) => void;
  onAddQuiz: (quizIndex: number) => void;
  onAddQuestion: (quizIndex: number) => void;
  onDeleteQuestion: (quizIndex: number, questionIndex: number) => void;
  onQuestionChange: <T extends keyof IQuiz['questions'][0]>(quizIndex: number, questionIndex: number, field: T, value: IQuiz['questions'][0][T]) => void;
  control: Control<ICourseFormData>;
}