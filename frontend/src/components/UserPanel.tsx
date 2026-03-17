import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/api";
import TaskList from "./TaskList";
import StatsCards from "./StatsCards";
import type { Task, TokenData } from "../types/task";

export default function UserPanel() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const normalizeTaskList = (data: any[]) =>
    data.map((item) => (item?.task ? item.task : item));

  const fetchTasks = async () => {

    const token = localStorage.getItem("token");
    if (!token) return;

    const user = jwtDecode<TokenData>(token);

    try {

      const res = await api.get(`/tasks/user/${user.sub}`);

      setTasks(normalizeTaskList(res.data));

    } catch (error) {

      console.error("Error fetching tasks:", error);
      alert("Error al cargar tareas");

    }

  };

  const loadTasks = async () => {

    setLoading(true);

    await fetchTasks();

    setLoading(false);

  };

  useEffect(() => {

    loadTasks();

  }, []);

  if (loading) {

    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );

  }

  return (

    <div className="space-y-8">

      {/* ESTADÍSTICAS */}
      <StatsCards tasks={tasks} />

      {/* LISTA DE TAREAS */}
      <TaskList
        tasks={tasks}
        refresh={loadTasks}
      />

    </div>

  );

}