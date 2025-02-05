import React, { useEffect, useMemo } from 'react';
import InputField from '@/app/components/input/InputField';
import LessonSection from '@/app/components/form/course/LessonSection';
import QuizSection from '@/app/components/form/course/QuizSection';
import { Course } from '@/app/api/interface/Course';
import { CourseFormData } from '@/app/components/form/course/interface/course_form_data';
import useCourses from '@/app/hooks/useCourses';
import useCourseFormHandlers from '@/app/hooks/useCourseFormHandlers';
import { useForm, Controller, FormProvider, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import CustomDropdown from '@/app/components/form/fields/CustomDropDown';

interface CourseFormProps {
  course?: Course;
  router: ReturnType<typeof useRouter>;
}

const CourseFormContent: React.FC<CourseFormProps> = ({ course }) => {
  const router = useRouter();
  const { error, addCourse, updateCourse } = useCourses();
  const { control, handleSubmit, formState: { errors }, watch } = useFormContext<CourseFormData>();
  const {
    handleLessonChange,
    handleAddLesson,
    handleDeleteLesson,
    handleQuizChange,
    handleQuestionChange,
    handleAddQuiz,
    handleDeleteQuiz,
    handleAddQuestion,
    handleDeleteQuestion,
    trigger,
  } = useCourseFormHandlers();

  const instructors = [
    { id: 1, label: 'John Doe' },
    { id: 2, label: 'Jane Smith' },
    { id: 3, label: 'Robert Johnson' },
    { id: 4, label: 'Alice Brown' },
  ];

  const handleFormSubmit = async (data: CourseFormData) => {
    const isValid = await trigger();
    if (!isValid) return;

    try {
      if (course?.id !== undefined && !isNaN(course.id)) {
        await updateCourse(course.id, data);
      } else {
        await addCourse(data);
      }
    } catch (err) {
      console.error(err);
      return;
    }

    router.push('/admin/courses');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-7xl w-full p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-semibold text-teal-800 mb-6">
          {course ? 'Edit Course' : 'Add New Course'}
        </h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field }) => <InputField {...field} placeHolder="Title" />}
          />
          {errors.title && <p className="text-red-600">{errors.title.message}</p>}

          <Controller
            name="description"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => <InputField {...field} placeHolder="Description" />}
          />
          {errors.description && <p className="text-red-600">{errors.description.message}</p>}

          {/* Custom Dropdown for Instructor Selection */}
          <Controller
            name="instructor"
            control={control}
            rules={{ required: 'Instructor is required' }}
            render={({ field }) => (
              <CustomDropdown
                options={instructors}
                placeholder="Select Instructor"
                onSelect={(selectedId) => field.onChange(selectedId)}
              />
            )}
          />
          {errors.instructor && <p className="text-red-600">{errors.instructor.message}</p>}

          <LessonSection
            lessons={watch('lessons')}
            onAddLesson={handleAddLesson}
            onDeleteLesson={handleDeleteLesson}
            onLessonChange={handleLessonChange}
          />

          <QuizSection
            control={control}
            quizzes={watch('quizzes')}
            onAddQuiz={handleAddQuiz}
            onDelete={handleDeleteQuiz}
            onChange={handleQuizChange}
            onAddQuestion={handleAddQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onQuestionChange={handleQuestionChange}
          />

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {course ? 'Update Course' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CourseForm: React.FC<CourseFormProps> = ({ course, router }) => {
  const defaultCourseValues = useMemo(
    () => ({
      title: course?.title || '',
      description: course?.description || '',
      instructor: course?.instructor || '',
      status: (course?.status as 'Active' | 'Inactive') || 'Active',
      lessons: course?.lessons || [{ title: '', content: '', video: null, order: 1 }],
      quizzes: course?.quizzes || [{ title: '', questions: [] }],
    }),
    [course]
  );

  const methods = useForm<CourseFormData>({
    defaultValues: defaultCourseValues,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (course) {
      methods.setValue('title', course.title);
      methods.setValue('description', course.description);
      methods.setValue('instructor', course.instructor);
      methods.setValue('status', course.status as 'Active' | 'Inactive');
    }
  }, [course, methods]);

  return (
    <FormProvider {...methods}>
      <CourseFormContent course={course} router={router} />
    </FormProvider>
  );
};

export default CourseForm;
