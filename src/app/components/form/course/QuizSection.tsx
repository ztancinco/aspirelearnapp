import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import { CourseFormData } from '@/app/components/form/course/interface/course_form_data';
import { QuizSectionProps } from '@/app/components/form/course/interface/quiz_section_prop';
import InputField from '@/app/components/input/InputField';
import SelectField from '@/app/components/input/SelectField'

const QuizSection: React.FC<QuizSectionProps> = ({
  onChange,
  onDelete,
  onAddQuiz,
  onAddQuestion,
  onDeleteQuestion,
}) => {
  const { control, watch } = useFormContext<CourseFormData>();
  const quizzes = watch('quizzes') || [];

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Quizzes</h3>

      {quizzes.map((quiz, quizIndex) => (
        <div
          key={quizIndex}
          className="mb-6 p-6 bg-gradient-to-r from-teal-100 to-blue-200 rounded-lg shadow-lg relative"
        >
          <button
            type="button"
            className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
            onClick={() => onDelete(quizIndex)}
            style={{ marginRight: '-5px'}}
          >
            <TrashIcon className="h-6 w-6" />
          </button>

          <Controller
            name={`quizzes.${quizIndex}.title`}
            control={control}
            rules={{ required: 'Quiz title is required' }}
            render={({ field, fieldState }) => (
              <div>
                <InputField {...field} placeHolder="Quiz Title" />
                {fieldState?.error && (
                  <p className="text-red-600">{fieldState?.error?.message}</p>
                )}
              </div>
            )}
          />

          <div className="mt-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Questions</h4>
            {quiz.questions && quiz.questions.length > 0 ? (
              quiz.questions.map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  className="mb-6 relative bg-white p-4 rounded-lg shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => onDeleteQuestion(quizIndex, questionIndex)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition duration-200 ease-in-out flex items-center"
                  >
                    <MinusCircleIcon
                      className="h-5 w-5 mr-2"
                      style={{
                        marginRight: '-5px',
                        marginTop: '-5px',
                      }}
                    />
                  </button>

                  <Controller
                    name={`quizzes.${quizIndex}.questions.${questionIndex}.title`}
                    control={control}
                    rules={{ required: 'Question title is required' }}
                    render={({ field, fieldState }) => (
                      <div>
                        <InputField {...field} placeHolder="Question Title" />
                        {fieldState?.error && (
                          <p className="text-red-600">{fieldState?.error?.message}</p>
                        )}
                      </div>
                    )}
                  />

                  <div className="mb-4">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        checked={question.isMultipleChoice}
                        onChange={(e) =>
                          onChange(
                            quizIndex,
                            'questions',
                            quiz.questions.map((q, i) =>
                              i === questionIndex
                                ? { ...q, isMultipleChoice: e.target.checked }
                                : q
                            )
                          )
                        }
                        className="mr-2"
                      />
                      Is multiple choice
                    </label>
                  </div>

                  {question.isMultipleChoice && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Options</label>
                      {question.options.map((option, optionIndex) => (
                        <Controller
                          key={optionIndex}
                          name={`quizzes.${quizIndex}.questions.${questionIndex}.options.${optionIndex}`}
                          control={control}
                          rules={{ required: `Option ${optionIndex + 1} is required` }}
                          render={({ field, fieldState }) => (
                            <div>
                              <InputField {...field} placeHolder={`Option ${optionIndex + 1}`} />
                              {fieldState?.error && (
                                <p className="text-red-600">{fieldState?.error?.message}</p>
                              )}
                            </div>
                          )}
                        />
                      ))}
                    </div>
                  )}

                  <div className="mb-4">
                    {question.isMultipleChoice ? (
                      <Controller
                        name={`quizzes.${quizIndex}.questions.${questionIndex}.correctAnswer`}
                        control={control}
                        render={({ field }) => (
                          <SelectField
                            value={`Option ${Number(field.value) + 1}`}
                            onChange={(value) => field.onChange(Number(value.split(' ')[1]) - 1)}
                            options={question.options.map((_, optionIndex) => `Option ${optionIndex + 1}`)}
                            placeholder="Select the correct answer"
                          />
                        )}
                      />
                    ) : (
                      <Controller
                        name={`quizzes.${quizIndex}.questions.${questionIndex}.correctAnswer`}
                        control={control}
                        rules={{ required: 'Correct answer is required' }}
                        render={({ field, fieldState }) => (
                          <div>
                            <InputField {...field} placeHolder="Correct Answer" />
                            {fieldState?.error && (
                              <p className="text-red-600">{fieldState?.error?.message}</p>
                            )}
                          </div>
                        )}
                      />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="italic">No questions added yet.</p>
            )}

            <button
              type="button"
              onClick={() => onAddQuestion(quizIndex)}
              className="mt-4 text-green-600 hover:text-green-800 flex items-center"
            >
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Add Question
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onAddQuiz(quizzes.length)}
        className="mt-6 text-green-600 hover:text-green-800 flex items-center"
      >
        <PlusCircleIcon className="h-6 w-6 mr-2" />
        Add Quiz
      </button>
    </div>
  );
};

export default QuizSection;