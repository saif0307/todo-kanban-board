"use client";
import Column from "@/components/Column";
import Todo from "@/components/Todo";
import TodoModal from "@/components/TodoModal";
import { TodoProvider, useTodoContext } from "@/providers/TodoContext";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [todoModal, setTodoModal] = useState(false);
  const { todos, addTodo, removeTodo, editTodo, moveTodo } = useTodoContext();
  const [editTodoId, setEditTodoId] = useState<string | null>(null);

  const notify = (msg: string, type: "warning" | "error" | "success") =>
    toast(msg, { type: type });

  const edit = (id: string) => {
    setEditTodoId(id);
    setTodoModal(true);
  };

  const deleteTodo = (id: string) => {
    removeTodo(id);
    notify("Todo Deleted", "error");
  };

  const pendingTodos = todos
    .filter((todo) => !todo.completed)
    .map((todo, index) => (
      <Todo
        key={todo.id}
        {...todo}
        index={index}
        deleteTodo={deleteTodo}
        edit={edit}
      />
    ));

  const doneTodos = todos
    .filter((todo) => todo.completed)
    .map((todo, index) => (
      <Todo
        key={todo.id}
        {...todo}
        deleteTodo={deleteTodo}
        edit={edit}
        index={index}
      />
    ));
  const submit = (title: string, description: string) => {
    if (editTodoId) {
      editTodo(editTodoId, { title, description });
      setEditTodoId(null);
      return toast("Todo Updated", { type: "success" });
    }
    addTodo({
      id: uuid(),
      title,
      description,
      completed: false,
    });
    notify("Todo Added", "success");
  };
  return (
    <>
      <DragDropContext
        onDragEnd={(e) => {
          if (
            e.destination?.droppableId === "To-Do" &&
            e.source.droppableId === "Done"
          ) {
            editTodo(e.draggableId, { completed: false });
            toast("Todo moved to Pending", { type: "success" });
          } else if (
            e.destination?.droppableId === "Done" &&
            e.source.droppableId === "To-Do"
          ) {
            editTodo(e.draggableId, { completed: true });
            toast("Todo moved to Completed", { type: "success" });
          }
          else if (
            e.destination?.droppableId === e.source.droppableId &&
            e.destination?.index !== e.source.index
          ) {
            moveTodo(e.source.index, e.destination.index);
          }
        }}
      >
        <TodoProvider>
          <main className="bg-[#2B1887] min-h-screen w-full p-10">
            <h1 className="text-7xl text-white font-semibold text-center">
              Todo Kanban
            </h1>
            <section className="mt-12 grid grid-cols-2 gap-5 w-full justify-items-center">
              <Column
                openModal={() => {
                  setTodoModal(true);
                }}
                name="To-Do"
                icon="pending"
                todos={pendingTodos}
              />
              <Column name="Done" icon="done" todos={doneTodos} />
            </section>
          </main>
        </TodoProvider>
      </DragDropContext>

      <ToastContainer />
      {todoModal && (
        <TodoModal
          editTodoId={editTodoId}
          onSubmit={submit}
          close={() => {
            setEditTodoId(null);
            setTodoModal(false);
          }}
        />
      )}
    </>
  );
}


