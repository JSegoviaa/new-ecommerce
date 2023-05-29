import axios from 'axios';
import { ENV_VAR } from '../env';

export const api = axios.create({
  baseURL: ENV_VAR.serverApi,
  headers: {
    'api-token': ENV_VAR.token,
  },
});

export const authApi = axios.create({
  baseURL: ENV_VAR.serverApi,
  headers: { 'api-token': ENV_VAR.token },
});
