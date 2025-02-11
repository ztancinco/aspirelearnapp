import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import { ICourseFormData } from '@/app/api/interface/form/ICourseFormData';
import { IQuizSectionProps } from '@/app/api/interface/form/IQuizSectionProps';
import InputField from '@/app/components/input/InputField';
import SelectField from '@/app/components/input/SelectField'

const QuizSection: React.FC<IQuizSectionProps> = ({
  onChange,
  onDelete,
  onAddQuiz,
  onAddQuestion,
  onDeleteQuestion,
}) => {
  const { control, watch } = useFormContext<ICourseFormData>();
  const quizzes = watch('quizzes') || [];

  return (
    <div className="mt-8">
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
            rules={{ required: 'Title is required' }}
            render={({ field, fieldState }) => (
              <div>
                <InputField {...field} placeHolder="Title" />
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
                    rules={{ required: 'Title is required' }}
                    defaultValue={ question.text ?? ''}
                    render={({ field, fieldState }) => (
                      <div>
                        <InputField {...field} placeHolder="Question"/>
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
                        checked={question.is_multiple_choice}
                        onChange={(e) =>
                          onChange(
                            quizIndex,
                            'questions',
                            quiz.questions.map((q, i) =>
                              i === questionIndex
                                ? { ...q, is_multiple_choice: e.target.checked }
                                : q
                            )
                          )
                        }
                        className="mr-2"
                      />
                      Is multiple choice
                    </label>
                  </div>
                  {
                    question.is_multiple_choice && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Options</label>
                      {
                        question.answers.map((option, optionIndex) => (
                        <Controller
                          key={optionIndex}
                          name={`quizzes.${quizIndex}.questions.${questionIndex}.answers.${optionIndex}.text`}
                          control={control}
                          rules={{ required: `Option ${optionIndex + 1} is required` }}
                          render={({ field, fieldState }) => (
                            <div>
                              <InputField
                                {...field}
                                placeHolder={`Option ${optionIndex + 1}`}
                                value={String(field.value ?? '')}
                              />
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
                    {question.is_multiple_choice ? (
                      <Controller
                        name={`quizzes.${quizIndex}.questions.${questionIndex}.correct_answer`}
                        control={control}
                        render={({ field }) => (
                          <SelectField
                            value={`Option ${Number(field.value) + 1}`}
                            onChange={(value) => field.onChange(Number(value.split(' ')[1]) - 1)}
                            options={question.answers.map((_, optionIndex) => `Option ${optionIndex + 1}`)}
                            placeholder="Select the correct answer"
                          />
                        )}
                      />
                    ) : (
                    <Controller
                      name={`quizzes.${quizIndex}.questions.${questionIndex}.correct_answer`}
                      control={control}
                      defaultValue={question.answers && question.answers.length > 0 ? question.answers.find(a => a.is_correct)?.text : '' }
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