"use client";
import { Todo, TodoContextValue, TodoProviderProps } from "@/types/types";
import React, {
  createContext,
  useState,
  FC,
  ReactNode,
  useContext,
} from "react";

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

const TodoProvider: FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      title: "Learn React",
      description: "Learn React by building projects",
      completed: false,
    },
  ]);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id: string, updatedTodo: Partial<Todo>) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, ...updatedTodo };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  const moveTodo = (sourceIndex: number, destinationIndex: number) => {
    const updatedTodos = [...todos];
    const [removedTodo] = updatedTodos.splice(sourceIndex, 1);
    updatedTodos.splice(destinationIndex, 0, removedTodo);
    setTodos(updatedTodos);
  }

  const value: TodoContextValue = {
    todos,
    addTodo,
    removeTodo,
    editTodo,
    moveTodo
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

export { TodoProvider, useTodoContext };
