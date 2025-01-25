import { useFormContext } from 'react-hook-form';
import { Quiz } from '@/app/api/interface/quiz';
import { Lesson } from '../api/interface/Lesson';

const useCourseFormHandlers = () => {
  const context = useFormContext();

  if (!context) {
    console.error('useCourseFormHandlers must be used within a FormProvider');
    throw new Error('useCourseFormHandlers must be used within a FormProvider');
  }

  const { watch, setValue, trigger } = context;

  // Lesson Handlers
  const handleLessonChange = (
    index: number,
    field: keyof Lesson,
    value: Lesson[keyof Lesson]
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
    field: keyof Quiz,
    value: Quiz[keyof Quiz]
  ) => {
    const quizzes = watch('quizzes') || [];
    quizzes[quizIndex] = { ...quizzes[quizIndex], [field]: value };
    setValue('quizzes', quizzes);
  };

  const handleAddQuiz = () => {
    console.log('adding quiz');
    const quizzes = watch('quizzes') || [];
    console.log(quizzes);
    quizzes.push({ title: '', questions: [] });
    setValue('quizzes', quizzes);
  };

  const handleDeleteQuiz = (index: number) => {
    const quizzes = watch('quizzes') || [];
    quizzes.splice(index, 1);
    setValue('quizzes', quizzes);
  };

  // Question Handlers
  const handleQuestionChange = <T extends keyof Quiz['questions'][0]>(
    quizIndex: number,
    questionIndex: number,
    field: T,
    value: Quiz['questions'][0][T]
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
      options: ['', '', '', ''],
      correctAnswer: '',
      isMultipleChoice: false,
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
