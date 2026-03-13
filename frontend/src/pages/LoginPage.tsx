import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
      // show more details for debugging
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

    // Nota: las variables de entorno ADMIN_EMAIL/ADMIN_PASSWORD solo son leídas por el backend; no afectan este frontend. Ingresa las credenciales en el formulario.
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Task Manager Login
        </h2>

        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-6"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>

    </div>

  )
}