# 🧩 Sistema de Gestión de Tareas - Frontend

Aplicación web desarrollada con **React + TypeScript + Vite**, diseñada para la gestión de tareas con roles de usuario y administrador.

---

## 🚀 Tecnologías utilizadas

- **⚛️ React**
- **🟦 TypeScript**
- **⚡ Vite**
- **🎨 TailwindCSS**
- **🔐 JWT** (autenticación)
- **🌐 Axios** (consumo de API)
- **🎯 Lucide React** (iconos)

---

## 📁 Estructura del proyecto
```text
src/
├── api/            # Configuración de axios
├── components/     # Componentes reutilizables
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── TaskList.tsx
│   ├── CreateTask.tsx
│   ├── StatsCards.tsx
│   ├── UsersList.tsx
│   ├── AdminPanel.tsx
│   └── UserPanel.tsx
├── pages/          # Vistas (LoginPage, Dashboard)
├── types/          # Tipos TypeScript
└── main.tsx        # Punto de entrada
```

---

## 🔐 Autenticación y Seguridad

El flujo de seguridad se gestiona mediante JWT:

- **Inicio de Sesión:** El usuario accede a través de `/login`.
- **Almacenamiento:** El token se guarda en el `localStorage` del navegador.
- **Decodificación:** Se utiliza `jwt-decode` para extraer la información del usuario.
- **Control de Acceso:** Las vistas y acciones se filtran dinámicamente según el rol.

---

## 👥 Roles del sistema

**👤 Usuario:**
- Ver sus tareas asignadas.
- Confirmar tareas.

**🛠 Admin:**
- Ver todas las tareas.
- Ver sus tareas.
- Crear tareas.
- Asignar usuarios a tareas.
- Eliminar tareas.
- Ver lista de usuarios.

---

## 📡 Conexión con backend

El frontend consume una API REST (NestJS) mediante los siguientes endpoints principales:

| Método | Endpoint | Acción |
|--------|----------|--------|
| `POST` | `/auth/login` | Autenticación y obtención de token |
| `GET` | `/tasks` | Obtener todas las tareas (Admin) |
| `GET` | `/tasks/user/:id` | Obtener tareas por ID de usuario |
| `POST` | `/tasks` | Crear nueva tarea |
| `POST` | `/tasks/:id/assign/:userId` | Asignar usuario a tarea específica |
| `POST` | `/tasks/:id/confirm/:userId` | Confirmar cumplimiento de tarea |
| `DELETE` | `/tasks/:id` | Eliminar tarea del sistema |
| `GET` | `/users` | Obtener listado de usuarios |

---

## 🎨 Personalización de estilos

El proyecto utiliza una paleta de colores institucional configurada en `tailwind.config.js`:
```js
colors: {
  neuquenBlue: "#0F4C81",
  neuquenLight: "#2E86C1",
  neuquenAccent: "#F4B400",
  neuquenBg: "#bfc4cd",
}
```

> ⚠️ **Nota:** Si los colores no se aplican correctamente o necesitás usarlos de forma imperativa, podés usar: `bg-[#0F4C81]`.

---

## 📦 Instalación y Ejecución

**1. Instalar dependencias:**
```bash
npm install
```

**2. Ejecutar en desarrollo:**
```bash
npm run dev
```

**3. Build de producción:**
```bash
npm run build
```

---

## 📱 Responsive Design

- **Mobile-first:** Optimizado para dispositivos móviles desde el código base.
- **Sidebar Adaptable:** Se oculta o colapsa según la resolución.
- **Grid Dinámico:** Las tarjetas de tareas se reordenan automáticamente.
- **Navbar Fijo:** Navegación persistente con offset ajustado.

---

## 👩‍💻 Autora

**Melina Ulloa**