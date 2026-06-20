import axios from 'axios';

// Always use the Render backend in production, localhost in dev
const isLocal = window.location.hostname === 'localhost';
const API_BASE = isLocal
  ? 'http://localhost:5000/api'
  : 'https://new-qgen-backend.onrender.com/api';

const API = axios.create({
  baseURL: API_BASE,
});

// Upload
export const uploadSubject = (formData) =>
  API.post('/subjects/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Generate
export const generatePaper = (data) =>
  API.post('/generate-paper', data);

// Subjects list
export const listSubjects = () =>
  API.get('/subjects');

// Generated papers history
export const listPapers = () =>
  API.get('/papers');