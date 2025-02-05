export interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  date_joined: string;
  id?: number;
  roles?: string[];
  role?: string;
  password?: string;
}
