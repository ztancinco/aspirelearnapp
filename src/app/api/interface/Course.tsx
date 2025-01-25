import { CourseBase } from './CourseBase';

export interface Course extends CourseBase {
  instructor: string;
  video: string;
  enrolled: number;
  status: string;
}
