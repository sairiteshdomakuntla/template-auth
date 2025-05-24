import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';

export default function Dashboard() {
  const { token } = useAuth();
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTasks, setRefreshTasks] = useState(0);

  // Decode JWT to get user information
  useEffect(() => {
    if (token) {
      try {
        // Decode the JWT token to get user email
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const decoded = JSON.parse(jsonPayload);
        setUserData(decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [token]);

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTasks();
    }
  }, [token, refreshTasks]);

  const handleTaskCreated = () => {
    setRefreshTasks(prev => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome to Your Dashboard</h1>
        {userData && (
          <p className="text-gray-600">
            Hello, {userData.email}! Here's an overview of your tasks.
          </p>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <TaskForm onTaskCreated={handleTaskCreated} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
        
        {loading ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-6">You don't have any tasks yet.</p>
        ) : (
          <div className="space-y-3">
            {tasks.map(task => (
              <div 
                key={task._id} 
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <span className={task.completed ? "line-through text-gray-500" : ""}>
                    {task.title}
                  </span>
                  <div className="space-x-2">
                    <button 
                      className={`px-3 py-1 rounded text-sm ${task.completed 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"}`}
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}