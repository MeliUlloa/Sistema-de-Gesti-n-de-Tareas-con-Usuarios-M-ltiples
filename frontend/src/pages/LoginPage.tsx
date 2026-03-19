import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err: any) {
      // mas detallado para debugging
      console.error("Login failed:", err);
      if (err.response) {
        console.error("response data:", err.response.data);
        alert(`Error al iniciar sesión: ${err.response.data.message || err.response.status}`);
      } else {
        alert("Error al iniciar sesión (ver consola para más detalles)");
      }
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Task Manager Login
        </h2>

        {/* email */}
        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* contraseña ocultA*/}
        <div className="relative mb-6">
          <input
            className="w-full border p-2 rounded pr-10"
            type={showPassword ? "text" : "password"} // 🆕 alterna tipo
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/*  */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* boton mejorado */}
        <button
          onClick={handleLogin}
          className="
            w-full 
            bg-[#0F4C81]
            text-white 
            p-2.5 
            rounded-lg 
            font-medium
            shadow-sm
            hover:bg-[#256fa1]
            hover:shadow-md
            transition-all duration-200
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-400
          "
        >
          Iniciar sesión
        </button>

      </div>

    </div>

  )
}