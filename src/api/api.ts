import axios from 'axios';
import { serverApi } from '../env';

const token = localStorage.getItem('token');

export const api = axios.create({
  baseURL: serverApi,
  headers: { Authorization: 'Bearer ' + token },
});

export const authApi = axios.create({
  baseURL: serverApi,
  headers: { Authorization: 'Bearer ' + token },
});
