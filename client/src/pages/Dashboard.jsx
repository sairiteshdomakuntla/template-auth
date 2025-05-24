import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const { token } = useAuth();
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTasks, setRefreshTasks] = useState(0);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  // Decode JWT to get user information
  useEffect(() => {
    if (token) {
      try {
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
        
        // Calculate stats
        const completed = response.data.filter(task => task.completed).length;
        setStats({
          total: response.data.length,
          completed,
          pending: response.data.length - completed
        });
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Failed to load tasks');
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
    <div className="max-w-5xl mx-auto">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome to Your Dashboard</h1>
            {userData && (
              <p className="text-blue-100 mt-1">
                Hello, <span className="font-medium">{userData.email}</span>! Here's your activity overview.
              </p>
            )}
          </div>
          <div className="flex space-x-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center min-w-24">
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-xs text-blue-100 uppercase tracking-wider">Total Tasks</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center min-w-24">
              <p className="text-2xl font-bold text-white">{stats.completed}</p>
              <p className="text-xs text-blue-100 uppercase tracking-wider">Completed</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center min-w-24">
              <p className="text-2xl font-bold text-white">{stats.pending}</p>
              <p className="text-xs text-blue-100 uppercase tracking-wider">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Add Task Section */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Task</h2>
            <TaskForm onTaskCreated={handleTaskCreated} />
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Task Quick Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="bg-blue-100 text-blue-600 p-1 rounded mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Be specific with your task titles
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 text-blue-600 p-1 rounded mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Break large tasks into smaller ones
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 text-blue-600 p-1 rounded mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Focus on one task at a time
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Tasks List Section */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-full">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Your Tasks</h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-gray-100 rounded-full p-3 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-600">No tasks yet</p>
                <p className="text-gray-500 mt-1 max-w-xs">
                  Add your first task using the form to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map(task => (
                  <div 
                    key={task._id} 
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span 
                          className={`flex-shrink-0 h-4 w-4 rounded-full mr-3 ${
                            task.completed ? "bg-green-500" : "bg-yellow-500"
                          }`}
                        ></span>
                        <span className={task.completed ? "line-through text-gray-500" : "text-gray-800"}>
                          {task.title}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                        <button 
                          className={`px-3 py-1 rounded text-xs font-medium ${task.completed 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"}`}
                        >
                          {task.completed ? "Completed" : "Pending"}
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}