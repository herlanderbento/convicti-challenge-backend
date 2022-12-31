export interface CreateDirectorateDtos {
  name: string;
  directorate_name: string;
  roles: 'director' | 'manager';
  email: string;
  password: string;
}
