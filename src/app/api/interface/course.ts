import { CourseBase } from "./course_base";
import { Lesson } from "./Lesson";
import { Quiz } from "./quiz";

export interface Course extends CourseBase {
  quizzes?: Quiz[];
  lessons: Lesson[]
}
