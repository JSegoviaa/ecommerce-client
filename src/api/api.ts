import axios from 'axios';
import Cookies from 'js-cookie';
import { API, API_TOKEN } from '../env';

const token = Cookies.get('token') as string;

const api = axios.create({
  baseURL: API,
  headers: { 'api-token': API_TOKEN, 'x-token': token },
  withCredentials: true,
});

export default api;
