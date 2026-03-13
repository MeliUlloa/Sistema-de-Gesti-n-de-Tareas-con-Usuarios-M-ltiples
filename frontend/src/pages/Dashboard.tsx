import { useEffect, useState, useCallback } from "react";
import api from "../api/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  priority: "BAJA" | "MEDIA" | "ALTA";
  users: { id: number; email: string }[];
}

interface UserPayload {
  sub: number;
  email: string;
  role: "ADMIN" | "USER";
}

interface User {
  id: number;
  email: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"BAJA" | "MEDIA" | "ALTA">("MEDIA");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  // 🔹 Obtener usuario del JWT
  const token = localStorage.getItem("token");
  const user: UserPayload | null = token ? jwtDecode(token) : null;

  // 🔹 Obtener tareas según rol
  const fetchTasks = useCallback(async () => {
    try {
      const res = user?.role === "ADMIN"
        ? await api.get("/tasks") // admin ve todas
        : await api.get(`/tasks/my/${user?.sub}`); // usuario ve solo suyas
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  // 🔹 Obtener usuarios (solo ADMIN)
  const fetchUsers = useCallback(async () => {
    try {
      const res = await api.get("/users"); // backend: GET /users
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/"); // proteger ruta
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();

    if (user?.role === "ADMIN") {
      fetchUsers();
    }
  }, [fetchTasks, fetchUsers, navigate, token, user]);


  // 🔹 Crear tarea (solo ADMIN)
  const createTask = async () => {
    try {
      if (!title) return alert("Ingresa un título");
      await api.post("/tasks", { title, priority });
      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Asignar usuario a tarea (solo ADMIN)
  const assignUser = async (taskId: number) => {
    try {
      if (!selectedUser) return alert("Selecciona un usuario");
      await api.post(`/tasks/${taskId}/assign/${selectedUser}`);
      setSelectedUser(null);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Confirmar tarea (USERS o ADMIN si asignado)
  const confirmTask = async (taskId: number) => {
    try {
      await api.post(`/tasks/${taskId}/confirm/${user?.sub}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Bienvenido, {user?.email}</h1>
          <p>Rol: {user?.role}</p>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {user?.role === "ADMIN" && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Crear Tarea</h2>
          <input
            type="text"
            placeholder="Título de la tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 mr-2 rounded"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as "BAJA" | "MEDIA" | "ALTA")}
            className="border p-2 mr-2 rounded"
          >
            <option value="BAJA">Baja</option>
            <option value="MEDIA">Media</option>
            <option value="ALTA">Alta</option>
          </select>
          <button
            onClick={createTask}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Crear
          </button>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">
          {user?.role === "ADMIN" ? "Todas las Tareas" : "Mis Tareas"}
        </h2>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border p-4 rounded flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{task.title}</h3>
                <p>
                  Estado:{" "}
                  <span
                    className={`font-semibold ${
                      task.status === "PENDING"
                        ? "text-yellow-500"
                        : task.status === "IN_PROGRESS"
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}
                  >
                    {task.status}
                  </span>
                </p>
                <p>Prioridad: {task.priority}</p>
                <p>
                  Usuarios asignados:{" "}
                  {task.users.map((u) => u.email).join(", ") || "Ninguno"}
                </p>
              </div>

              <div className="flex space-x-2 mt-2 md:mt-0 items-center">
                {/* Asignar usuario dropdown (solo ADMIN) */}
                {user?.role === "ADMIN" && (
                  <>
                    <select
                      value={selectedUser || ""}
                      onChange={(e) =>
                        setSelectedUser(Number(e.target.value))
                      }
                      className="border p-1 rounded"
                    >
                      <option value="">Seleccionar usuario</option>
                      {users
                        .filter((u) => !task.users.some((tu) => tu.id === u.id))
                        .map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.email}
                          </option>
                        ))}
                    </select>
                    <button
                      className="bg-purple-500 text-white px-3 py-1 rounded"
                      onClick={() => assignUser(task.id)}
                    >
                      Asignar
                    </button>
                  </>
                )}

                {/* Confirmar tarea si usuario asignado */}
                {task.users.some((u) => u.id === user?.sub) && (
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => confirmTask(task.id)}
                  >
                    Confirmar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}