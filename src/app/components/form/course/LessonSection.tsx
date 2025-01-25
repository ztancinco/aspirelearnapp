import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import InputField from '@/app/components/input/InputField';
import { Lesson } from '@/app/api/interface/Lesson';
import { CourseFormData } from './interface/course_form_data';

interface LessonSectionProps {
  lessons: Lesson[];
  onAddLesson: () => void;
  onDeleteLesson: (index: number) => void;
  onLessonChange: (index: number, field: keyof Lesson, value: Lesson[keyof Lesson]) => void;
}

const LessonSection: React.FC<LessonSectionProps> = ({
  onAddLesson,
  onDeleteLesson,
  onLessonChange
}) => {
  const { control, watch } = useFormContext<CourseFormData>();
  const lessons = watch('lessons') || [];

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Lessons</h3>
      {lessons.map((lesson, index) => (
        <div 
          key={index} 
          className="mb-4 p-6 bg-gradient-to-r from-teal-100 to-blue-200 rounded-lg shadow-lg relative"
        >
          <button
            type="button"
            className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
            style={{ marginRight: '-5px'}}
            onClick={() => onDeleteLesson(index)}
          >
            <TrashIcon className="h-6 w-6" />
          </button>

          <Controller
            name={`lessons.${index}.title`}
            control={control}
            rules={{ required: 'Lesson title is required' }}
            render={({ field, fieldState }) => (
              <div>
                <InputField
                  {...field}
                  placeHolder="Lesson Title"
                  onChange={(e) => onLessonChange(index, 'title', e.target.value)}
                />
                {fieldState?.error && (
                  <p className="text-red-600">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name={`lessons.${index}.content`}
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                placeHolder="Lesson Content"
                onChange={(e) => onLessonChange(index, 'content', e.target.value)}
              />
            )}
          />

          <Controller
            name={`lessons.${index}.video`}
            control={control}
            render={({ field }) => (
              <InputField
                type="file"
                {...field}
                value=""
                placeHolder="Upload Video"
                onChange={(e) =>
                  onLessonChange(index, 'video', (e.target.files ? e.target.files[0] : null) as File)
                }
              />
            )}
          />

          <Controller
            name={`lessons.${index}.order`}
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                type="number"
                placeHolder="Order"
                onChange={(e) => onLessonChange(index, 'order', parseInt(e.target.value))}
              />
            )}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={onAddLesson}
        className="mt-4 text-green-600 hover:text-green-800 flex items-center"
      >
        <PlusCircleIcon className="h-5 w-5 mr-2" />
        Add Lesson
      </button>
    </div>
  );
};

export default LessonSection;