export interface Todo {
    title: string;
    description: string;
    year: string;
    isCompleted: boolean;
  isPublic: boolean;
  userId?: string;
}

export interface ITodo {
  _id?: string | undefined;
  title: string;
  description: string;
  year: string;
  isCompleted: boolean;
  isPublic: boolean;
  userId?: string;
}
