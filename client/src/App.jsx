// import React, { useState } from 'react';
// import TaskList from './components/TaskList';
// import TaskForm from './components/TaskForm';

// export default function App() {
//   const [refresh, setRefresh] = useState(false);

//   return (
//     <div>
//       <h1>Task Manager</h1>
//       <TaskForm onTaskCreated={() => setRefresh(prev => !prev)} />
//       <TaskList key={refresh} />
//     </div>
//   );
// }



import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Task Manager</h1>
      <div className="w-full max-w-xl bg-white rounded-lg shadow p-6">
        <TaskForm onTaskCreated={() => setRefresh(prev => !prev)} />
        <TaskList key={refresh} />
      </div>
    </div>
  );
}
