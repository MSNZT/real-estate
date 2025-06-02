import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { tokenService } from "../../services/token.service";
import { authService } from "../../services/auth.service";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
let refreshTokenPromise: Promise<void> | null = null;

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
    const originalRequest = error.config as CustomAxiosRequestConfig;
    console.log(error);

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      console.log("kek");

      try {
        await authService.refreshAuthToken();
        return $apiWithAuth(originalRequest);
      } catch (error) {
        console.log(error);
        await authService.logout();
        tokenService.removeAccessToken();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
