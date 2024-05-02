import { ReactNode } from "react";

type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

type TodoContextValue = {
  todos: Todo[];
  addTodo: (newTodo: Todo) => void;
  removeTodo: (id: string) => void;
  editTodo: (id: string, updatedTodo: Partial<Todo>) => void;
  moveTodo: (sourceIndex: number, destinationIndex: number) => void;
};

type TodoProviderProps = {
  children: ReactNode; // ReactNode includes all valid React children types
};

type ColumnProps = {
  name: string;
  icon: string;
  todos: ReactNode[];
  openModal?: () => void | undefined;
};

type IconsType = {
  [key: string]: React.ComponentType<any>;
};

type TodoModalProps = {
  onSubmit: (
    title: string,
    description: string
  ) => void;
  close: () => void;
  editTodoId?: string | null;
};

export type {
  Todo,
  TodoContextValue,
  TodoProviderProps,
  ColumnProps,
  IconsType,
  TodoModalProps,
};
