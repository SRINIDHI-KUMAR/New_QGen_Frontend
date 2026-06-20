import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
  API.get('/papers');      // You can add this route in backend