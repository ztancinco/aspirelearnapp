import React, { useEffect, useMemo, useState } from 'react';
import { useForm, Controller, FormProvider, useFormContext } from 'react-hook-form';
import BackTabHeader from '@/app/components/BackTabHeader';
import CustomDropdown from '@/app/components/input/CustomDropDown';
import InputField from '@/app/components/input/InputField';
import LessonSection from '@/app/components/form/course/LessonSection';
import QuizSection from '@/app/components/form/course/QuizSection';
import { ICourse } from '@/app/api/interface/ICourse';
import { ICourseFormData } from '@/app/api/interface/form/ICourseFormData';
import useCourses from '@/app/hooks/useCourses';
import useCourseFormHandlers from '@/app/hooks/useCourseFormHandlers';
import { useRouter } from 'next/navigation';

interface ICourseFormProps {
  course?: ICourse;
  router: ReturnType<typeof useRouter>;
}

const CourseFormContent: React.FC<ICourseFormProps> = ({ course }) => {
  const router = useRouter();
  const { error, addCourse, updateCourse, fetchInstructors, getInstructors } = useCourses();
  const { control, handleSubmit, formState: { errors }, watch } = useFormContext<ICourseFormData>();
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

  const instructors = getInstructors;
  const [activeTab, setActiveTab] = useState<"lessons" | "quizzes">("lessons");

  const handleFormSubmit = async (data: ICourseFormData) => {
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

  useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);

  return (
    <div>
      <div className="flex items-center justify-center bg-gray-100">
        <div className="w-full p-8 bg-white shadow-xl rounded-lg">
          <BackTabHeader 
            title={course ? "Edit Course" : "Add New Course"} 
            onBack={() => router.back()} 
          />
      
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => <InputField {...field} placeHolder="Title" />}
            />
            {errors.title && <p className="text-red-600">{errors.title.message}</p>}

            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => <InputField {...field} placeHolder="Description" />}
            />
            {errors.description && <p className="text-red-600">{errors.description.message}</p>}

            {/* Custom Dropdown for Instructor Selection */}
            <Controller
              name="instructor"
              control={control}
              rules={{ required: "Instructor is required" }}
              render={({ field }) => (
                <CustomDropdown
                  options={instructors.map((instructor) => ({
                    id: instructor.id ?? 0,
                    label: `${instructor.first_name}, ${instructor.last_name}`,
                  }))}
                  placeholder="Select Instructor"
                  value={field.value ? Number(field.value) : ""}
                  onSelect={(selectedId) => field.onChange(selectedId)}
                />
              )}
            />
            {errors.instructor && <p className="text-red-600">{errors.instructor.message}</p>}

            {/* Tabs for Lessons & Quizzes */}
            <div className="flex border-b mt-6">
              <button
                type="button"
                className={`px-6 py-3 font-semibold text-lg border-b-4 ${
                  activeTab === "lessons" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
                }`}
                onClick={() => setActiveTab("lessons")}
              >
                Lessons
              </button>
              <button
                type="button"
                className={`px-6 py-3 font-semibold text-lg border-b-4 ${
                  activeTab === "quizzes" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
                }`}
                onClick={() => setActiveTab("quizzes")}
              >
                Quizzes
              </button>
            </div>

            {/* Render the Active Section */}
            {activeTab === "lessons" ? (
              <LessonSection
                lessons={watch("lessons")}
                onAddLesson={handleAddLesson}
                onDeleteLesson={handleDeleteLesson}
                onLessonChange={handleLessonChange}
              />
            ) : (
              <QuizSection
                control={control}
                quizzes={watch("quizzes")}
                onAddQuiz={handleAddQuiz}
                onDelete={handleDeleteQuiz}
                onChange={handleQuizChange}
                onAddQuestion={handleAddQuestion}
                onDeleteQuestion={handleDeleteQuestion}
                onQuestionChange={handleQuestionChange}
              />
            )}

            <div className="mt-6">
              <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                {course ? "Update Course" : "Add Course"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const CourseForm: React.FC<ICourseFormProps> = ({ course, router }) => {
  const defaultCourseValues = useMemo(
    () => ({
      title: course?.title || "",
      description: course?.description || "",
      instructor: typeof course?.instructor === "string" ? course.instructor : course?.instructor?.id?.toString() || "",
      status: (course?.status as "Active" | "Inactive") || "Active",
      lessons: course?.lessons || [{ title: "", content: "", video: null, order: 1 }],
      quizzes: course?.quizzes || [{ title: "", questions: [] }],
    }),
    [course]
  );

  const methods = useForm<ICourseFormData>({
    defaultValues: defaultCourseValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (course) {
      const instructorId = typeof course?.instructor === "string" ? course.instructor : course?.instructor?.id?.toString() || "";
      methods.setValue("title", course.title);
      methods.setValue("description", course.description);
      methods.setValue("instructor", instructorId);
      methods.setValue("status", course.status as "Active" | "Inactive");
    }
  }, [course, methods]);

  return (
    <FormProvider {...methods}>
      <CourseFormContent course={course} router={router} />
    </FormProvider>
  );
};

export default CourseForm;
