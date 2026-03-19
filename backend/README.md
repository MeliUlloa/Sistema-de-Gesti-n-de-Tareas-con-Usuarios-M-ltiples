# 🛠️ Sistema de Gestión de Tareas - Backend

API REST desarrollada con **NestJS + Prisma + MySQL**, encargada de la gestión de usuarios, autenticación y administración de tareas. Incluye autenticación con JWT, control de roles y relaciones entre usuarios y tareas.

---

## 🚀 Tecnologías utilizadas

- 🧱 NestJS
- 🟦 TypeScript
- 🗄 Prisma ORM
- 🐬 MySQL / MariaDB
- 🔐 JWT (autenticación)
- 🔑 Passport
- 🧂 bcrypt (hash de contraseñas)
- ✅ class-validator / class-transformer

---

## 📁 Estructura del proyecto

```
src/
├── main.ts
├── app.module.ts
│
├── auth/
├── users/
├── tasks/
└── prisma/
```

Arquitectura modular basada en buenas prácticas de NestJS.

---

## ⚙️ Configuración inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Variables de entorno

Crear archivo `.env`:

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:/db_name"
JWT_SECRET=
PORT=
```

### 3. Configurar base de datos

```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Ejecutar servidor

```bash
npm run start:dev
```

---

## 🔐 Autenticación

El sistema utiliza **JWT**:

- Login genera token
- Token se envía en headers:

```
Authorization: Bearer <token>
```

---

## 👥 Roles del sistema

| Rol   | Permisos                        |
|-------|---------------------------------|
| user  | Ver tareas, confirmar           |
| admin | CRUD completo + asignaciones    |

---

## 🔐 Seguridad implementada

- ✅ JWT Authentication
- ✅ Guards (`JwtGuard`, `RolesGuard`)
- ✅ Decoradores personalizados (`@Roles`)
- ✅ Hash de contraseñas con bcrypt
- ✅ Validación con DTOs
- ✅ Whitelisting de propiedades

---

## 📡 Endpoints principales

### 🔑 Auth

| Método | Endpoint          | Descripción       |
|--------|-------------------|-------------------|
| POST   | `/auth/register`  | Registrar usuario |
| POST   | `/auth/login`     | Login             |

### 👥 Users (Admin)

| Método | Endpoint  | Descripción     |
|--------|-----------|-----------------|
| GET    | `/users`  | Listar usuarios |
| POST   | `/users`  | Crear usuario   |

### ✅ Tasks

| Método | Endpoint                        | Rol        | Descripción       |
|--------|---------------------------------|------------|-------------------|
| POST   | `/tasks`                        | user/admin | Crear tarea       |
| GET    | `/tasks`                        | user/admin | Listar todas      |
| GET    | `/tasks/user/:id`               | user/admin | Tareas por usuario|
| PUT    | `/tasks/:id`                    | admin      | Actualizar        |
| DELETE | `/tasks/:id`                    | admin      | Eliminar          |
| POST   | `/tasks/:id/assign/:userId`     | admin      | Asignar usuario   |
| POST   | `/tasks/:id/confirm/:userId`    | user/admin | Confirmar tarea   |

---

## 🗄️ Modelo de datos

### 👤 User

- `id`
- `name`
- `email`
- `password`
- `role` (admin | user)
- `tareas[]`

### 📋 Task

- `id`
- `title`
- `description`
- `status` (pending, in_progress, completed)
- `priority` (low, medium, high)
- `usuarios[]`

### 🔗 TaskUser (relación)

- `userId`
- `taskId`
- `confirmed` (boolean)

> Relación muchos a muchos entre usuarios y tareas.

---

## 🧠 Lógica destacada

### ✔ Asignación de tareas

- Un admin asigna usuarios
- Se guarda en tabla intermedia

### ✔ Confirmación de tareas

- Usuario confirma tarea asignada
- Se actualiza campo `confirmed`

### ✔ Normalización de respuestas

- DTOs para evitar exponer datos sensibles
- Transformación con `class-transformer`

---

## 📦 Dependencias clave

```json
{
  "@nestjs/core": "^11",
  "@nestjs/jwt": "JWT",
  "@nestjs/passport": "Auth",
  "@prisma/client": "ORM",
  "bcrypt": "Hash",
  "class-validator": "Validación"
}
```

---

## ⚠️ Problemas comunes

### ❌ Error de conexión DB

- Verificar `DATABASE_URL`
- Revisar si MySQL está corriendo

### ❌ Token inválido

- Verificar `JWT_SECRET`
- Chequear expiración

### ❌ Relaciones no funcionan

Ejecutar:

```bash
npx prisma migrate dev
```

---

## ✨ Características principales

- 🔐 Autenticación segura con JWT
- 🛡 Control de acceso por roles
- 📋 CRUD completo de tareas
- 👥 Gestión de usuarios
- 🔗 Relación muchos a muchos
- ⚡ Arquitectura modular
- 🧼 Código limpio con DTOs

---

## 📌 Próximas mejoras

- 📅 Fechas de vencimiento
- 🔔 Notificaciones
- 📊 Estadísticas avanzadas
- 📎 Adjuntos en tareas
- 🔍 Filtros y búsqueda

---

## 👩‍💻 Autora

**Melina Ulloa**  
Desarrolladora Full Stack
