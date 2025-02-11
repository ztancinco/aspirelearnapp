import { IUser } from "./IUser";

export interface ICourseBase {
  id?: number;
  title: string;
  description: string;
  instructor?: IUser | string;
  status: 'Active' | 'Inactive';
}