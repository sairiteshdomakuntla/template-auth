import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tasks';

export const getTasks = () => axios.get(API_URL);

export const createTask = (task) => axios.post(API_URL, task);
