import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/api";
import TaskList from "./TaskList";
import UsersList from "./UsersList";
import CreateTask from "./CreateTask";
import StatsCards from "./StatsCards";
import type { Task, User } from "../types/task";

interface AdminPanelProps {
  activeSection: "tasks" | "all" | "users";
}

export default function AdminPanel({ activeSection }: AdminPanelProps) {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const normalizeTaskList = (data: any[]) =>
    data.map((item) => (item?.task ? item.task : item));

  const fetchAllTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(normalizeTaskList(res.data));
  };

  const fetchMyTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const user = jwtDecode<{ sub: number }>(token);

    const res = await api.get(`/tasks/user/${user.sub}`);
    setTasks(normalizeTaskList(res.data));
  };

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {

    const load = async () => {

      setLoading(true);

      try {

        if (activeSection === "all") {
          await fetchAllTasks();
        }

        if (activeSection === "tasks") {
          await fetchMyTasks();
        }

        if (activeSection === "users") {
          await fetchUsers();
        }

        if (activeSection !== "users") {
          await fetchUsers(); // necesario para asignar tareas
        }

      } catch (error) {

        console.error("Error loading data:", error);

      } finally {

        setLoading(false);

      }

    };

    load();

  }, [activeSection]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {activeSection !== "users" ? (

        <>
          <CreateTask refresh={() => {
            if (activeSection === "all") fetchAllTasks();
            if (activeSection === "tasks") fetchMyTasks();
          }} />

          <StatsCards tasks={tasks} />

          <TaskList
            tasks={tasks}
            isAdmin
            refresh={() => {
              if (activeSection === "all") fetchAllTasks();
              if (activeSection === "tasks") fetchMyTasks();
            }}
            users={users}
          />
        </>

      ) : (

        <UsersList users={users} />

      )}

    </div>
  );
}