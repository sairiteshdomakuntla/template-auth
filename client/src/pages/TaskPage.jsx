import { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function TaskPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  
  const handleTaskCreated = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList key={refreshKey} />
    </div>
  );
}