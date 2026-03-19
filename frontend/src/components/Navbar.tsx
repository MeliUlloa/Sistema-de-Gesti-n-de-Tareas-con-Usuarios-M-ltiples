import { LogOut, User } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import type { TokenData } from "../types/task";

interface NavbarProps {
  userRole?: string;
  onLogout: () => void;
}

export default function Navbar({ userRole, onLogout }: NavbarProps) {

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode<TokenData>(token) : null;

  const roleBadge =
    userRole?.toUpperCase() === "ADMIN"
      ? "bg-purple-100 text-purple-700"
      : "bg-blue-100 text-blue-700";

  return (
    <header className="sfixed top-0 left-0 right-0 h-[80px] bg-[#0F4C81] shadow-lg border-b border-black/10 z-50 w-full">

      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

        {/* sistema */}
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-semibold text-white">
            Sistema de Gestión de Tareas
          </span>

          <span className="text-xs text-white/80">
            Municipalidad de Neuquén
          </span>
        </div>

        {/* user */}
        <div className="flex items-center gap-4">

          {/* nombre */}
          <div className="flex items-center gap-2 text-white text-sm font-medium">
            <User size={18} className="text-white/80"/>
            {user?.email ?? "Usuario"}
          </div>

          {/* rol */}
          {userRole && (
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${roleBadge}`}
            >
              {userRole}
            </span>
          )}

          {/* logout */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition-all duration-200 text-white px-3 py-1.5 rounded-md text-sm font-medium shadow-sm hover:shadow-md"
          >
            <LogOut size={16} />
            Salir
          </button>

        </div>

      </div>

    </header>
  );
}