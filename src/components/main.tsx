import { CheckFatIcon, TrashIcon, PlusIcon } from "@phosphor-icons/react";

import { useEffect, useState } from "react";
import {
  getTarefas,
  postTarefa,
  putTarefa,
  deleteTarefa,
} from "../server/tarefa";
import type { Tarefa } from "../server/tarefa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Main = () => {
  const [tarefa, setTarefa] = useState("");
  const [list, setList] = useState<Tarefa[]>([]);

  //mostrar tarefas ja disponiveis
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTarefas();
        if (data) setList(data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    }
    fetchData();
  }, []);

  //add new Tarefa
  const addTarefa = async () => {
    if (tarefa.trim() === "") return;
    try {
      const newTarefa = await postTarefa({ text: tarefa });
      if (newTarefa) {
        setList((prev) => [...prev, newTarefa]);
        setTarefa("");
      }
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  //alterar o estado do done
  const doneTarefa = async (index: number) => {
    const item = list[index];
    try {
      const atualizada = await putTarefa({
        id: item._id,
        done: !item.done,
      });

      if (atualizada) {
        const novaLista = [...list];
        novaLista[index] = atualizada;
        setList(novaLista);
      }
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
    }
  };

  //DELETE Tarefa
  const handleDeleteTarefa = async (index: number) => {
    const item = list[index];
    try {
      await deleteTarefa({ id: item._id });
      setList((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  return (
    <div className="p-10">
      <section className="m-10">
        <form
          className="flex w-full max-w-sm items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            addTarefa();
          }}
        >
          <Input
            type="text"
            required
            value={tarefa}
            placeholder="Digite uma Tarefa"
            onChange={(e) => setTarefa(e.target.value)}
          />
          <Button type="submit" variant="outline" className="bg-green-500 text-white">
            <PlusIcon size={20} />
          </Button>
        </form>
      </section>
      <section className="p-4 rounded shadow-md">
        {list.map((item, index) => (
          <Card key={item._id} className="mb-4">
            <CardHeader>
              <CardTitle className={item.done ? "text-green-600" : ""}>
  {item.text}
</CardTitle>
              <CardDescription>
                {item.done ? "Concluída" : "Pendente"}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => doneTarefa(index)}
                className="bg-blue-500 text-white"
              >
                <CheckFatIcon size={20} />
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDeleteTarefa(index)}
                className="bg-red-500 text-white"
              >
                <TrashIcon size={20} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
};