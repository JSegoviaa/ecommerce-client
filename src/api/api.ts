import axios from 'axios';
import Cookies from 'js-cookie';
import { API, API_TOKEN } from '../env';

const token = Cookies.get('token') || '';

const api = axios.create({
  baseURL: API,
  headers: { 'api-token': API_TOKEN, 'x-token': token },
});

export default api;
