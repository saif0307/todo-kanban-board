import DoneIcon from "@/icons/DoneIcon";
import PendingIcon from "@/icons/PendingIcon";
import { ColumnProps, IconsType } from "@/types/types";
import React from "react";
import { Droppable } from "react-beautiful-dnd";

const icons: IconsType = {
  pending: PendingIcon,
  done: DoneIcon,
};

const Column = ({ name, icon, todos, openModal }: ColumnProps) => {
  const IconComponent = icons[icon];
  return (
    <div className="p-6 bg-[#D5CCFF] h-fit rounded-2xl max-w-[560px] w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <IconComponent />
          <h3 className="text-[#2B1887] text-3xl font-bold">{name}</h3>
        </div>
        {openModal && (
          <button
            onClick={openModal}
            className="
             text-[#2B1887]
             font-semibold
             text-lg
             bg-[#F4F2FF]
             rounded-lg
             p-2
             cursor-pointer
             hover:bg-[#e5e2f5]
             "
          >
            Add +
          </button>
        )}
      </div>
      <Droppable droppableId={name}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="mt-6 flex flex-col pb-6 gap-4"
          >
            {todos.length > 0 ? (
              todos
            ) : (
              <p className="text-2xl text-center font-semibold">
                {" "}
                No Todos here
              </p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
