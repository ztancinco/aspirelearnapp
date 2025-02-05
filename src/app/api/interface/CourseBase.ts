export interface CourseBase {
  id?: number;
  title: string;
  description: string;
  instructor: string;
  status: 'Active' | 'Inactive';
}