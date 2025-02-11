import { ICourseBase } from "./ICourseBase";
import { ILesson } from "./ILesson";
import { IQuiz } from "./IQuiz";

export interface ICourse extends ICourseBase {
  quizzes?: IQuiz[];
  lessons?: ILesson[]
}
