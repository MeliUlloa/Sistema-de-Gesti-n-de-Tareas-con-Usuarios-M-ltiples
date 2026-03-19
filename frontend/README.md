🧩 Sistema de Gestión de Tareas - Frontend

Aplicación web desarrollada con React + TypeScript + Vite, diseñada para la gestión de tareas con roles de usuario y administrador.

Inspirada visualmente en el estilo de la Municipalidad de Neuquén, con una interfaz moderna, responsiva y clara.

🚀 Tecnologías utilizadas

⚛️ React

🟦 TypeScript

⚡ Vite

🎨 TailwindCSS

🔐 JWT (autenticación)

🌐 Axios (consumo de API)

🎯 Lucide React (iconos)

📁 Estructura del proyecto
src/
│
├── api/               # Configuración de axios
├── components/        # Componentes reutilizables
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── TaskList.tsx
│   ├── CreateTask.tsx
│   ├── StatsCards.tsx
│   ├── UsersList.tsx
│   ├── AdminPanel.tsx
│   └── UserPanel.tsx
│
├── pages/
│   ├── LoginPage.tsx
│   └── Dashboard.tsx
│
├── types/             # Tipos TypeScript
└── main.tsx
🔐 Autenticación

El sistema utiliza JWT:

El usuario inicia sesión desde /login

El token se guarda en localStorage

Se decodifica con jwt-decode

Se controla acceso según rol:

👤 Usuario

🛠 Admin

👥 Roles del sistema
👤 Usuario

Ver sus tareas asignadas

Confirmar tareas

🛠 Admin

Ver todas las tareas

Ver sus tareas

Crear tareas

Asignar usuarios a tareas

Eliminar tareas

Ver lista de usuarios

📦 Instalación
npm install
▶️ Ejecutar en desarrollo
npm run dev
🏗 Build de producción
npm run build
🎨 Personalización de estilos

Se utiliza TailwindCSS con colores personalizados:

colors: {
  neuquenBlue: "#0F4C81",
  neuquenLight: "#2E86C1",
  neuquenAccent: "#F4B400",
  neuquenBg: "#bfc4cd",
}

⚠️ Nota: Si los colores no se aplican correctamente, usar directamente:

bg-[#0F4C81]
📡 Conexión con backend

El frontend consume una API REST (NestJS) con endpoints como:

POST   /auth/login
GET    /tasks
GET    /tasks/user/:id
POST   /tasks
POST   /tasks/:id/assign/:userId
POST   /tasks/:id/confirm/:userId
DELETE /tasks/:id
GET    /users
📱 Responsive Design

Mobile-first

Sidebar adaptable

Grid dinámico

Navbar fijo con offset

👩‍💻 Autora

Melina Ulloa