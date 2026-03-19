import { useState } from "react";
import api from "../api/api";
import { jwtDecode } from "jwt-decode";
import type { Task, User, TokenData } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  isAdmin?: boolean;
  refresh?: () => void;
  users?: User[];
}

export default function TaskList({
  tasks,
  isAdmin,
  refresh,
  users = [],
}: TaskListProps) {
  const [selectedUserByTask, setSelectedUserByTask] = useState<
    Record<number, number | null>
  >({});

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode<TokenData>(token) : null;

  const handleDelete = async (taskId: number) => {
    if (!confirm("¿Eliminar esta tarea?")) return;

    try {
      await api.delete(`/tasks/${taskId}`);
      refresh?.();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error al eliminar tarea");
    }
  };

  const handleAssign = async (taskId: number) => {
    const selectedUser = selectedUserByTask[taskId];

    if (!selectedUser) {
      alert("Selecciona un usuario");
      return;
    }

    try {
      await api.post(`/tasks/${taskId}/assign/${selectedUser}`);

      setSelectedUserByTask((prev) => ({
        ...prev,
        [taskId]: null,
      }));

      refresh?.();
    } catch (error) {
      console.error("Error assigning user:", error);
      alert("Error al asignar usuario");
    }
  };

  const handleConfirm = async (taskId: number) => {
    try {
      await api.post(`/tasks/${taskId}/confirm/${user?.sub}`);
      refresh?.();
    } catch (error) {
      console.error("Error confirming task:", error);
      alert("Error al confirmar tarea");
    }
  };

  const statusBadge = (status: string) => {
    const base = "text-xs px-2.5 py-1 rounded-full font-medium capitalize";

    if (status === "PENDING") return `${base} bg-[#e3f2fd] text-[#1565c0]`;
    if (status === "IN_PROGRESS")
      return `${base} bg-[#fff3cd] text-[#b26a00]`;
    if (status === "COMPLETED")
      return `${base} bg-[#e8f5e9] text-[#2e7d32]`;

    return `${base} bg-gray-100 text-gray-600`;
  };

  const priorityBadge = (priority: string) => {
    const base = "text-xs px-2.5 py-1 rounded-full font-medium capitalize";

    if (priority === "high") return `${base} bg-[#fdecea] text-[#c62828]`;
    if (priority === "medium")
      return `${base}bg-[#fff8e1] text-[#f9a825]`;

    return `${base} bg-[#e8f5e9] text-[#2e7d32]`;
  };

  if (!tasks.length) {
    return (
      <div className="mt-6 text-gray-500 text-sm">
        No hay tareas para mostrar.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {tasks.map((task) => {
        const selectedUser = selectedUserByTask[task.id] ?? "";

        return (
          <div
            key={task.id}
            className=" bg-white 
              border border-gray-100 
              rounded-xl 
              shadow-sm 
              p-5 
              hover:shadow-md 
              transition-all duration-200"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {task.title}
                </h3>

                <div className="mt-2 flex gap-2">
                  <span className={statusBadge(task.status)}>
                    {task.status}
                  </span>

                  <span className={priorityBadge(task.priority)}>
                    {task.priority}
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-500 text-right">
                {(task.users ?? [])
                  .map((u) => u.user?.name)
                  .join(", ") || "Sin usuarios asignados"}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 items-center">
              {isAdmin && (
                <>
                  <select
                    id={`assign-user-${task.id}`}
                    name={`assignUser-${task.id}`}
                    value={selectedUser}
                    onChange={(e) =>
                      setSelectedUserByTask((prev) => ({
                        ...prev,
                        [task.id]: Number(e.target.value),
                      }))
                    }
                    className="border border-gray-300 
                      rounded-md 
                      px-3 py-1.5 
                      text-sm 
                      bg-white
                      focus:ring-2 focus:ring-[#0F4C81]/40
                      focus:outline-none"
                  >
                    <option value="">Seleccionar usuario</option>

                    {users
                      .filter(
                        (u) =>
                          !(task.users ?? []).some(
                            (tu) => tu.user?.id === u.id
                          )
                      )
                      .map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name}
                        </option>
                      ))}
                  </select>

                  <button
                    onClick={() => handleAssign(task.id)}
                    disabled={!selectedUser}
                    className="bg-[#0F4C81] 
                      text-white 
                      px-4 py-1.5 
                      rounded-md 
                      text-sm 
                      font-medium
                      hover:bg-[#256fa1]
                      transition
                      disabled:opacity-50 
                      disabled:cursor-not-allowed"
                  >
                    Asignar
                  </button>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                </>
              )}

              {(task.users ?? []).some(
                (u) => u.user?.id === user?.sub && !u.confirmed
              ) && (
                <button
                  onClick={() => handleConfirm(task.id)}
                  className="  bg-green-500 
                    text-white 
                    px-3 py-1.5 
                    rounded-md 
                    text-sm 
                    hover:bg-green-600 
                    transition"
                >
                  Confirmar
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}