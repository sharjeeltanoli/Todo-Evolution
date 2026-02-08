// frontend/types/index.ts

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  name: string;
  gender: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface User {
  id: number;
  email: string;
  name: string;
  gender: string;
}

export interface Tag {
  id: number;
  name: string;
  color?: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  due_date?: string;
  recurrence_rule?: string;
  tags: Tag[];
  is_overdue: boolean;
  created_at: string;
  updated_at: string;
  user_id: number;
  parent_task_id?: number;
}

export interface TaskCreate {
  title: string;
  description?: string;
  priority?: string;
  due_date?: string;
  recurrence_rule?: string;
  tags?: string[];
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: string;
  due_date?: string;
  recurrence_rule?: string;
  tags?: string[];
}