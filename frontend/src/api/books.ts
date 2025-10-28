import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const api = axios.create({ baseURL });

export const getBooks = async () => {
  const res = await api.get('/api/books');
  return res.data;
};

export const addBook = async (book: any) => {
  const res = await api.post('/api/books', book);
  return res.data;
};

export const updateBook = async (id: string, book: any) => {
  const res = await api.put(`/api/books/${id}`, book);
  return res.data;
};

export const deleteBook = async (id: string) => {
  const res = await api.delete(`/api/books/${id}`);
  return res.data;
};
