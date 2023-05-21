import axios from 'axios';
import { ENV_VAR } from '../env';

const token = localStorage.getItem('token');

export const api = axios.create({
  baseURL: ENV_VAR.serverApi,
  headers: {
    Authorization: 'Bearer ' + token,
    'api-token': ENV_VAR.token,
  },
});

export const authApi = axios.create({
  baseURL: ENV_VAR.serverApi,
  headers: { Authorization: 'Bearer ' + token, 'api-token': ENV_VAR.token },
});
