import React from 'react';
import type { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="border border-gray-300 p-4 m-2 rounded shadow">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="text-gray-700">{task.description}</p>
      <p className="text-sm text-gray-500">Status: {task.status}</p>
    </div>
  );
};

export default TaskCard;
