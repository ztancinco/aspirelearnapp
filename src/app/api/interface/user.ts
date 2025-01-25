export interface User {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
  bio: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
