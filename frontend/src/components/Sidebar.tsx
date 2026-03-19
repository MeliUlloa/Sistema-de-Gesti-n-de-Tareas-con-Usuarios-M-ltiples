interface SidebarProps {
  isAdmin?: boolean;
  active: "tasks" | "all" | "users";
  onSelect: (section: "tasks" | "all" | "users") => void;
}

export default function Sidebar({ isAdmin, active, onSelect }: SidebarProps) {

  const buttonClass = (selected: boolean) =>
    `flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-md text-sm font-medium
    transition-all duration-200
    ${
      selected
        ? "bg-[#0F4C81]/10 text-[#0F4C81] border-l-4 border-[#0F4C81]"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <aside className="bg-white
      shadow-sm
      border border-gray-100
      rounded-xl
      p-5
      lg:w-64
      h-fit     ">

      <h2 className=" text-xs
        font-semibold
        text-gray-400
        uppercase
        tracking-wider
        mb-4">
        Menú
      </h2>

      <nav className="flex flex-col gap-1">

        <button
          className={buttonClass(active === "tasks")}
          onClick={() => onSelect("tasks")}
        >
          <span>📋</span>
          Mis tareas
        </button>

        {isAdmin && (
          <>
            <button
              className={buttonClass(active === "all")}
              onClick={() => onSelect("all")}
            >
              <span>🗂</span>
              Todas las tareas
            </button>

            <button
              className={buttonClass(active === "users")}
              onClick={() => onSelect("users")}
            >
              <span>👥</span>
              Usuarios
            </button>
          </>
        )}

      </nav>

    </aside>
  );
}