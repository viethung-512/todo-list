export interface Task {
  id: string;
  title: string;
  descriptions?: string;
  dueDate: string;
  priority: 'low' | 'normal' | 'hight';
}
