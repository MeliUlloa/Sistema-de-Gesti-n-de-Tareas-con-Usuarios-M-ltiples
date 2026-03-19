import { useState } from "react";
import api from "../api/api";

interface CreateTaskProps {
  refresh: () => void;
}

export default function CreateTask({ refresh }: CreateTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

  const handleCreate = async () => {
    if (!title.trim()) {
      alert("Ingresa un título");
      return;
    }

    if (!description.trim()) {
      alert("Ingresa una descripción");
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      priority: priority.toLowerCase(),
    };

    try {
      await api.post("/tasks", payload);

      setTitle("");
      setDescription("");
      setPriority("low");

      refresh();
    } catch (error: any) {
      console.error("Error creating task:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Error al crear tarea";

      alert(`Error al crear tarea: ${message}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Crear nueva tarea
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          id="task-title"
          name="title"
          autoComplete="off"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          id="task-description"
          name="description"
          autoComplete="off"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          id="task-priority"
          name="priority"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "low" | "medium" | "high")
          }
        >
          <option value="low">Prioridad baja</option>
          <option value="medium">Prioridad media</option>
          <option value="high">Prioridad alta</option>
        </select>

        <button
          onClick={handleCreate}
          className="bg-[#0F4C81] text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-[#256fa1] transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Crear tarea
        </button>
      </div>
    </div>
  );
}