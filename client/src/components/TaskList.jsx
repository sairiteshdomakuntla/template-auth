import React, { useEffect, useState } from 'react';
import { getTasks } from '../api/tasks';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks()
      .then(res => setTasks(res.data))
      .catch(console.error);
  }, []);

  return (
    <ul className="space-y-3">
      {tasks.map(task => (
        <li
          key={task._id}
          className="border border-gray-300 rounded-md px-4 py-2 shadow-sm"
        >
          {task.title}
        </li>
      ))}
    </ul>
  );
}
