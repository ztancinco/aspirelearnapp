import { CourseBase } from "./CourseBase";
import { Lesson } from "./Lesson";
import { Quiz } from "./Quiz";

export interface Course extends CourseBase {
  quizzes?: Quiz[];
  lessons: Lesson[]
}
