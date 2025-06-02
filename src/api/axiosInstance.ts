import axios from 'axios';
import { getRefreshToken, saveTokens, clearTokens } from '../utils/auth';
import { getAccessToken } from '../utils/tokenStore';

const api = axios.create({
  baseURL: "http://10.19.249.225:8080",
});

api.interceptors.request.use(async (config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  async (error) => {
    if (error.response?.status === 401) {
      const refresh = await getRefreshToken();
      if (refresh) {
        try {
          const res = await axios.post('http://10.19.249.225:8080/auth/refresh', { refresh_token: refresh });
          const newAccessToken = JSON.stringify(res.data.token);
			await saveTokens(res.data.token, res.data.refreshToken);

          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(error.config);
        } catch (err) {
          await clearTokens();
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
