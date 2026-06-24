export interface Task {
  id: number;
  title: string;
  description: string;
  status: 0 | 1; // 0 = Pending, 1 = Completed
  createdAt: string;
}
