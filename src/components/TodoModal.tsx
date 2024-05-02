import { useTodoContext } from "@/providers/TodoContext";
import { TodoModalProps } from "@/types/types";
import React, { use, useEffect, useState } from "react";

const TodoModal = ({ onSubmit, close, editTodoId }: TodoModalProps) => {
  const { todos, addTodo, removeTodo, editTodo } = useTodoContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editTodoId) {
      const todo = todos.find((todo) => todo.id === editTodoId);
      if (todo) {
        setTitle(todo.title);
        setDescription(todo.description);
      }
    }
  }, [editTodoId]);

  return (
    <div
      onClick={close}
      className="bg-black bg-opacity-70 w-screen flex items-center justify-center h-screen fixed top-0 left-0"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="max-w-[600px] py-8 px-5 rounded-xl w-full bg-white"
      >
        <h2 className="text-center text-3xl font-semibold text-indigo-900">
          Add Todo
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(title, description);
            close();
            setTitle("");
            setDescription("");
          }}
          className="mt-4"
        >
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required={true}
            id="title"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Apply For Fullstack Job"
          />
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required={true}
            id="description"
            placeholder="Write a proposal for the job application"
            className="mb-5 mt-2 text-gray-600 focus:outline-none py-2 min-h-[200px] focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          />
          <button
            type="submit"
            className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
          >
            Submit
          </button>
          <button
            onClick={close}
            type="button"
            className="focus:outline-none ml-4 transition duration-150 ease-in-out hover:bg-indigo-200 text-indigo-800 border-indigo-700 rounded text-white px-8 py-2 text-sm"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;
