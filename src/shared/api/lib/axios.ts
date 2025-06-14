import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { tokenService } from "../../services/token.service";
import { authService } from "../../services/auth.service";
import { API_URL } from "@/shared/config/environment";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry: boolean;
}

const BASE_URL = API_URL;

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

    if (error.response?.status === 401 && !originalRequest?._retry) {
      console.log("refresh", error);
      originalRequest._retry = true;

      if (tokenService.getAccessToken()) {
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
    }
    return Promise.reject(error);
  }
);
