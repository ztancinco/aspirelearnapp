import { User } from '@/app/api/interface/User';

export interface CourseBase {
  id?: number;
  title: string;
  description: string;
  instructor?: User | string;
  status: 'Active' | 'Inactive';
}