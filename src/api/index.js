import axios from 'axios';

// Determine base URL: Render in production, localhost in dev
const BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : 'https://new-qgen-backend.onrender.com/api';

const API = axios.create({ baseURL: BASE_URL });

// Add token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const loginUser = (data) => API.post('/login', data);
export const registerUser = (data) => API.post('/register', data);

// Subjects
export const uploadSubject = (formData) =>
  API.post('/subjects/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const listSubjects = () => API.get('/subjects');

// Paper generation and history
export const generatePaper = (data) => API.post('/generate-paper', data);
export const listPapers = () => API.get('/papers');

export default API;