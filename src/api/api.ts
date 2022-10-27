import axios from 'axios';
import { API, API_TOKEN } from '../env';

const api = axios.create({
  baseURL: API,
  headers: { 'api-token': API_TOKEN },
});

export default api;
