import { Plus, CheckFat,Trash } from "@phosphor-icons/react";
import React, { useState } from "react";

type Tarefa = {
  text: string;
  done: boolean;
};

export const Main = () => {
  const [tarefa, setTarefa] = useState("");
  const [list, setList] = useState<Tarefa[]>([]);

  const addTarefa = () => {
    if (tarefa.trim() !== "") {
      setList([...list, { text: tarefa, done: false }]);
      setTarefa("");
    }
  };

  const doneTarefa = (index: number) => {
    const newList = [...list];
    newList[index].done = !newList[index].done;
    setList(newList);
  };
  const deleteTarefa = (index: number) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  };
  return (
    <div className="p-10">
      <section className="m-10">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            value={tarefa}
            placeholder="Digite uma Tarefa"
            onChange={(e) => setTarefa(e.target.value)}
          />
          <button onClick={addTarefa} className="bg-green-500 text-white">
            <Plus size={24} />
          </button>
        </label>
      </section>
      <section className=" p-4 rounded shadow-md">
        <ul className="list bg-base-100  pl-5 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Tarefas para esta semana
          </li>
          {list.map((item, index) => (
            <li
              key={index}
              className="flex justfay-between items-center m-5 "
            >
              <span className={item.done ? "line-through text-green-500" : ""}>
                {item.text}
              </span>
              <div className="flex gap-2">
                
                <button onClick={() => doneTarefa(index)} className="mr-5">
                  {" "}
                  <CheckFat size={24} />
                
                </button>
                <button onClick={() => deleteTarefa(index)} className="bg-red">
                    <Trash size={24} />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
