import ProgressIcon from "@/icons/ProgressIcon";
import Trashicon from "@/icons/Trashicon";
import { Todo as TodoType } from "@/types/types";
import React from "react";
import { Draggable, resetServerContext } from "react-beautiful-dnd";

type TodoProps = TodoType & {
  index: number;
  edit: (id: string) => void;
  deleteTodo: (id: string) => void;
};

const Todo = ({
  title,
  description,
  completed,
  id,
  index,
  edit,
  deleteTodo,
}: TodoProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          onClick={() => {
            edit(id);
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="max-w-[512px] !opacity-100  w-full p-6 rounded-xl bg-[#F4F2FF] hover:bg-[#e5e2f5] "
        >
          <div className="flex items-center justify-between ">
            <h1 className="text-2xl font-bold text-black">{title}</h1>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(id);
              }}
              title="Delete Todo"
              className="hover:opacity-80 hover:scale-105"
            >
              <Trashicon />
            </button>
          </div>
          <p className="mt-4">{description}</p>
          <div className="flex items-center mt-6 justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-lg p-2 bg-[#ECB800] text-white font-semibold text-base">
                Fri
              </div>
              <div className="flex items-center gap-3">
                <ProgressIcon fill={completed ? "#2D41A7" : "#ECB800"} />
                <ProgressIcon fill={completed ? "#2D41A7" : ""} />
              </div>
            </div>
            <div className="text-[#2B1887] text-2xl">{index + 1}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Todo;
