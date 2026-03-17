import type { User } from "../types/task";

interface UsersListProps {
  users: User[];
}

export default function UsersList({ users }: UsersListProps) {

  const roleBadge = (role: string) => {

    const base = "px-2 py-1 text-xs rounded-full font-semibold";

    if (role?.toLowerCase() === "admin")
      return `${base} bg-red-100 text-red-700`;

    return `${base} bg-blue-100 text-blue-700`;
  };

  const avatar = (name: string) => {
    return name?.charAt(0).toUpperCase() ?? "?";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Usuarios del sistema
      </h2>

      {users.length === 0 ? (

        <div className="text-gray-500 text-sm">
          No hay usuarios para mostrar.
        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>
              <tr className="text-left text-gray-500 border-b">

                <th className="pb-3 font-medium">Usuario</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Rol</th>

              </tr>
            </thead>

            <tbody>

              {users.map((user) => (

                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="py-3 flex items-center gap-3">

                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                      {avatar(user.name)}
                    </div>

                    <span className="text-gray-800 font-medium">
                      {user.name}
                    </span>

                  </td>

                  <td className="py-3 text-gray-600">
                    {user.email}
                  </td>

                  <td className="py-3">
                    <span className={roleBadge(user.role)}>
                      {user.role}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}