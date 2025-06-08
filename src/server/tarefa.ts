const host = import.meta.env.VITE_HOST;

export type Tarefa = {
  _id: string;
  text: string;
  done: boolean;
};

// BUSCAR todas as tarefas
export async function getTarefas(): Promise<Tarefa[] | undefined> {
  try {
    const res = await fetch(`${host}/tarefas`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar tarefas:", err);
  }
}

// CRIAR uma nova tarefa
export async function postTarefa({
  text,
}: {
  text: string;
}): Promise<Tarefa | undefined> {
  try {
    const res = await fetch(`${host}/tarefas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text,done: false }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erro ao criar tarefa:", err);
  }
}

// ATUALIZAR (ex: marcar como feita)
export async function putTarefa({
  id,
  done,
}: {
  id: string;
  done: boolean;
}): Promise<Tarefa | undefined> {
  try {
    const res = await fetch(`${host}/tarefas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erro ao atualizar tarefa:", err);
  }
}

// DELETAR uma tarefa
export async function deleteTarefa({
  id,
}: {
  id: string;
}): Promise<void> {
  try {
    await fetch(`${host}/tarefas/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error("Erro ao deletar tarefa:", err);
  }
}

// BUSCAR uma tarefa específica
export async function getTarefaById({
  id,
}: {
  id: string;
}): Promise<Tarefa | undefined> {
  try {
    const res = await fetch(`${host}/tarefas/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar tarefa por ID:", err);
  }
}