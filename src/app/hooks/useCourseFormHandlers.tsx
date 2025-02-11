import { useFormContext } from 'react-hook-form';
import { IQuiz } from '@/app/api/interface/IQuiz';
import { ILesson } from '@/app/api/interface/ILesson';

const useCourseFormHandlers = () => {
  const context = useFormContext();

  if (!context) {
    throw new Error('useCourseFormHandlers must be used within a FormProvider');
  }

  const { watch, setValue, trigger } = context;

  // Lesson Handlers
  const handleLessonChange = (
    index: number,
    field: keyof ILesson,
    value: ILesson[keyof ILesson]
  ) => {
    const lessons = watch('lessons') || [];
    lessons[index] = { ...lessons[index], [field]: value };
    setValue('lessons', lessons);
  };

  const handleAddLesson = () => {
    const lessons = watch('lessons') || [];
    lessons.push({
      title: '',
      content: '',
      video: null,
      order: lessons.length + 1,
    });
    setValue('lessons', lessons);
  };

  const handleDeleteLesson = (index: number) => {
    const lessons = watch('lessons') || [];
    lessons.splice(index, 1);
    setValue('lessons', lessons);
  };

  // Quiz Handlers
  const handleQuizChange = (
    quizIndex: number,
    field: keyof IQuiz,
    value: IQuiz[keyof IQuiz]
  ) => {
    const quizzes = watch('quizzes') || [];
    quizzes[quizIndex] = { ...quizzes[quizIndex], [field]: value };
    setValue('quizzes', quizzes);
  };

  const handleAddQuiz = () => {
    const quizzes = watch('quizzes') || [];
    quizzes.push({ title: '', questions: [] });
    setValue('quizzes', quizzes);
  };

  const handleDeleteQuiz = (index: number) => {
    const quizzes = watch('quizzes') || [];
    quizzes.splice(index, 1);
    setValue('quizzes', quizzes);
  };

  // Question Handlers
  const handleQuestionChange = <T extends keyof IQuiz['questions'][0]>(
    quizIndex: number,
    questionIndex: number,
    field: T,
    value: IQuiz['questions'][0][T]
  ) => {
    const quizzes = watch('quizzes') || [];
    const question = quizzes[quizIndex]?.questions[questionIndex];
    if (question) {
      question[field] = value;
      setValue('quizzes', quizzes);
    }
  };

  const handleAddQuestion = (quizIndex: number) => {
    const quizzes = watch('quizzes') || [];
    quizzes[quizIndex]?.questions.push({
      title: '',
      answers: ['', '', '', ''],
      correct_answer: '',
      is_multiple_choice: false,
    });
    setValue('quizzes', quizzes);
  };

  const handleDeleteQuestion = (quizIndex: number, questionIndex: number) => {
    const quizzes = watch('quizzes') || [];
    quizzes[quizIndex]?.questions.splice(questionIndex, 1);
    setValue('quizzes', quizzes);
  };

  return {
    // Lesson Handlers
    handleLessonChange,
    handleAddLesson,
    handleDeleteLesson,

    // Quiz Handlers
    handleQuizChange,
    handleAddQuiz,
    handleDeleteQuiz,

    // Question Handlers
    handleQuestionChange,
    handleAddQuestion,
    handleDeleteQuestion,

    // Utilities
    trigger,
  };
};

export default useCourseFormHandlers;
