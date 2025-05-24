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
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        disabled={loading}
        className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded-md text-white ${
          loading 
            ? "bg-indigo-400 cursor-not-allowed" 
            : "bg-indigo-600 hover:bg-indigo-700"
        } transition`}
      >
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}