export interface User {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string[];
  is_active: boolean;
  date_joined: string;
}
