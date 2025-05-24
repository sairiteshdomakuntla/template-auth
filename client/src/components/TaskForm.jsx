// filepath: /home/sairitesh/proj/template (auth)/client/src/components/TaskForm.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.warning('Please enter a task title');
      return;
    }
    
    setLoading(true);
    
    try {
      await axios.post('http://localhost:3000/api/tasks', 
        { title }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      toast.success('Task added successfully!');
      onTaskCreated();
    } catch (err) {
      toast.error('Failed to add task. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            disabled={loading}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5
                      text-gray-700 placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                      disabled:bg-gray-100 disabled:text-gray-500
                      transition-all duration-200"
          />
          {title && (
            <div className="absolute top-0 right-4 h-full flex items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-indigo-500"></div>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 rounded-xl font-medium
                    bg-gradient-to-r from-indigo-600 to-purple-600
                    text-white shadow-md
                    hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                    active:scale-[0.98]
                    disabled:opacity-60 disabled:pointer-events-none
                    transition-all duration-200"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
              <span>Adding...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Task
            </div>
          )}
        </button>
      </div>
      
      <div className="flex items-center mt-4 text-xs text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Enter a clear, specific task description
      </div>
    </form>
  );
}