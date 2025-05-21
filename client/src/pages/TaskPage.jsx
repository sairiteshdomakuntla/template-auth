import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function TaskPage() {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <TaskForm />
      <TaskList />
    </div>
  );
}
