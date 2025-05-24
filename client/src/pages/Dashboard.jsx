// filepath: /home/sairitesh/proj/template (auth)/client/src/pages/Dashboard.jsx
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
    <div className="max-w-6xl mx-auto mt-20 px-4">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg p-8 mb-10 overflow-hidden relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-white"></div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-2">
              DASHBOARD
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Welcome to TaskFlow</h1>
            {userData && (
              <p className="text-purple-100 mt-2">
                Hello, <span className="font-medium">{userData.email}</span>! Here's your activity overview.
              </p>
            )}
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 text-center min-w-28 transform transition-all hover:scale-105 hover:bg-white/20">
              <p className="text-3xl font-bold text-white">{stats.total}</p>
              <p className="text-xs text-purple-100 uppercase tracking-wider mt-1">Total Tasks</p>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 text-center min-w-28 transform transition-all hover:scale-105 hover:bg-white/20">
              <p className="text-3xl font-bold text-white">{stats.completed}</p>
              <p className="text-xs text-purple-100 uppercase tracking-wider mt-1">Completed</p>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 text-center min-w-28 transform transition-all hover:scale-105 hover:bg-white/20">
              <p className="text-3xl font-bold text-white">{stats.pending}</p>
              <p className="text-xs text-purple-100 uppercase tracking-wider mt-1">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Add Task Section */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-lg bg-indigo-100 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Add New Task</h2>
            </div>
            
            <TaskForm onTaskCreated={handleTaskCreated} />
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Task Quick Tips</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 p-1 rounded-md bg-green-100 text-green-600 mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-600">Be specific with your task titles</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 p-1 rounded-md bg-green-100 text-green-600 mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-600">Break large tasks into smaller ones</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 p-1 rounded-md bg-green-100 text-green-600 mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-600">Focus on one task at a time</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Tasks List Section */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow h-full">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-lg bg-purple-100 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full absolute border-4 border-gray-200"></div>
                  <div className="w-12 h-12 rounded-full absolute border-4 border-indigo-600 opacity-100 animate-spin border-t-transparent"></div>
                </div>
              </div>
            ) : tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-6 bg-purple-50 rounded-full mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No tasks yet</h3>
                <p className="text-gray-500 max-w-xs">
                  Your task list is empty. Create your first task using the form to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2 -mr-2">
                {tasks.map(task => (
                  <div 
                    key={task._id} 
                    className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-purple-200 group relative"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <button className={`h-5 w-5 rounded-full border flex-shrink-0 transition-all ${
                          task.completed 
                            ? "bg-gradient-to-r from-green-400 to-emerald-500 border-none" 
                            : "border-gray-300 group-hover:border-purple-400"
                        }`}>
                          {task.completed && (
                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <span className={`${task.completed ? "line-through text-gray-400" : "text-gray-800"} transition-colors`}>
                          {task.title}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {new Date(task.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric'
                          })}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.completed 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {task.completed ? "Completed" : "In Progress"}
                        </span>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <button className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-indigo-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
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