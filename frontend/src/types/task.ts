export interface Task {
  id: number;
  title: string;
  description?: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
  users: {
    id: number;
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
    confirmed: boolean;
  }[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface TokenData {
  sub: number;
  email: string;
  role: string;
}
