import type { Task } from "../types/task";

interface Props {
  tasks: Task[];
}

export default function StatsCards({ tasks }: Props) {

  const normalizeStatus = (status?: string) =>
    status?.toUpperCase() ?? "";

  const total = tasks.length;

  const pending = tasks.filter(
    (t) => normalizeStatus(t.status) === "PENDING"
  ).length;

  const inProgress = tasks.filter(
    (t) => normalizeStatus(t.status) === "IN_PROGRESS"
  ).length;

  const completed = tasks.filter(
    (t) => normalizeStatus(t.status) === "COMPLETED"
  ).length;

  const progress =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const card = (
    title: string,
    value: number,
    color: string,
    icon: string
  ) => (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <p className="text-3xl font-bold text-gray-800 mt-1">
            {value}
          </p>
        </div>

        <div className={`text-2xl ${color}`}>
          {icon}
        </div>

      </div>

      <div className={`mt-4 h-1 w-16 rounded-full ${color}`} />

    </div>
  );

  return (
    <div className="space-y-6">

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {card("Total tareas", total, "text-blue-600", "📋")}

        {card("Pendientes", pending, "text-yellow-600", "⏳")}

        {card("En progreso", inProgress, "text-purple-600", "⚙️")}

        {card("Completadas", completed, "text-green-600", "✅")}

      </div>

      {/* PROGRESS BAR */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">

        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progreso general</span>
          <span>{progress}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">

          <div
            className="bg-green-500 h-3 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />

        </div>

      </div>

    </div>
  );
}