import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { tokenService } from "../services/token.service";
import { authService } from "../services/auth.service";
import { unknown } from "zod";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry: boolean;
}

const BASE_URL = "http://localhost:5001/api/";

export const $api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const $apiWithAuth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

$apiWithAuth.interceptors.request.use((config) => {
  const accessToken = tokenService.getAccessToken();
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

$apiWithAuth.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    console.log(error);

    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      if (!tokenService.getRefreshToken()) {
        return Promise.reject(error);
      }

      try {
        await authService.refreshAuthToken();
        return $apiWithAuth(originalRequest);
      } catch (refreshError) {
        authService.logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
