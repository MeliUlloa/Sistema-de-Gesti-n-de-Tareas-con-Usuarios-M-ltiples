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
      ? "bg-purple-200 text-purple-800"
      : "bg-blue-200 text-blue-800";

  return (
    <header className="fixed top-0 left-0 right-0 h-[70px] bg-neuquenBlue shadow-md border-b border-black/10 z-30">

      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

        {/* SISTEMA */}
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-semibold text-black">
            Sistema de Gestión de Tareas
          </span>

          <span className="text-xs text-black/80">
            Municipalidad de Neuquén
          </span>
        </div>

        {/* USUARIO */}
        <div className="flex items-center gap-4">

          {/* NOMBRE */}
          <div className="flex items-center gap-2 text-black text-sm font-medium">
            <User size={18} />
            {user?.email ?? "Usuario"}
          </div>

          {/* ROL */}
          {userRole && (
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${roleBadge}`}
            >
              {userRole}
            </span>
          )}

          {/* LOGOUT */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition text-white px-3 py-1.5 rounded-md text-sm font-medium"
          >
            <LogOut size={16} />
            Salir
          </button>

        </div>

      </div>

    </header>
  );
}