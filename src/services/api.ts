import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fmsc-backend-ef9dd45878be.herokuapp.com/api',
});

export default api;