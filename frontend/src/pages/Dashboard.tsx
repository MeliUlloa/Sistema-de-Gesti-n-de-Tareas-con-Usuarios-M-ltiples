import { useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import AdminPanel from "../components/AdminPanel";
import UserPanel from "../components/UserPanel";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import type { TokenData } from "../types/task";

export default function Dashboard() {

  const navigate = useNavigate();

  const [tokenError, setTokenError] = useState<string | null>(null);

  const [activeSection, setActiveSection] =
    useState<"tasks" | "all" | "users">("tasks");

  const token = useMemo(() => {
    return localStorage.getItem("token");
  }, []);

  const user = useMemo<TokenData | null>(() => {

    if (!token) return null;

    try {

      return jwtDecode<TokenData>(token);

    } catch (error) {

      console.error("Error decoding token:", error);

      localStorage.removeItem("token");

      return null;
    }

  }, [token]);

  useEffect(() => {

    if (!token || !user) {

      setTokenError("Sesión expirada");

      navigate("/");

    }

  }, [token, user, navigate]);

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  const isAdmin =
    user?.role?.toString().toUpperCase() === "ADMIN";

  useEffect(() => {

  if (!user) return;

  if (isAdmin) {
    setActiveSection("all");
  }

}, [user]);

  if (tokenError) {

    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {tokenError}
      </div>
    );

  }

  if (!user) {

    return (
      <div className="flex justify-center items-center min-h-screen">

        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>

      </div>
    );

  }

  return (

    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}

      <Navbar
        userRole={isAdmin ? "Admin" : "Usuario"}
        onLogout={logout}
      />

      {/* LAYOUT */}

      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-24 pb-10">

        <div className="flex flex-col lg:flex-row gap-6">

          {/* SIDEBAR */}

          <Sidebar
            isAdmin={isAdmin}
            active={activeSection}
            onSelect={setActiveSection}
          />

          {/* CONTENIDO */}

          <main className="flex-1 transition-all duration-300">

            {isAdmin ? (

              <AdminPanel
                activeSection={activeSection}
              />

            ) : (

              <UserPanel />

            )}

          </main>

        </div>

      </div>

    </div>

  );
}