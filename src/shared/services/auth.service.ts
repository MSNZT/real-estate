import { User } from "@/entities/user";
import { AUTH_ENDPOINTS } from "../api/endpoints";
import { $api, $apiWithAuth } from "../api/lib/axios";
import { tokenService } from "./token.service";
import {
  AuthResponse,
  EmailData,
  ForgetPasswordResponse,
  LoginData,
  PasswordCodeData,
  RegisterData,
  ResetPasswordData,
  StatusResponse,
} from "@/features/auth/types/auth";

class AuthService {
  async login(loginData: LoginData) {
    try {
      const { data } = await $api.post(AUTH_ENDPOINTS.login, loginData);

      if (data.accessToken) {
        tokenService.saveAccessToken(data.accessToken);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
  async register(regData: RegisterData) {
    try {
      const { data } = await $api.post(AUTH_ENDPOINTS.register, regData);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      const { data } = await $api.post(AUTH_ENDPOINTS.logout);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async forgetPassword(dto: EmailData) {
    try {
      const { data } = await $api.post<ForgetPasswordResponse>(
        AUTH_ENDPOINTS.forgetPassword,
        dto
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async forgetPasswordValidate(dto: PasswordCodeData) {
    try {
      const { data } = await $api.post<StatusResponse>(
        AUTH_ENDPOINTS.forgetPasswordValidate,
        dto
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(dto: ResetPasswordData) {
    try {
      await $api.post(AUTH_ENDPOINTS.resetPassword, dto);
    } catch (error) {
      throw error;
    }
  }

  async getMe(): Promise<User> {
    const { data } = await $apiWithAuth.get<User>(AUTH_ENDPOINTS.me);
    return data;
  }

  async refreshAuthToken() {
    try {
      const { data } = await $api.get<{ token: string }>(
        AUTH_ENDPOINTS.refresh
      );
      if (data?.token) {
        tokenService.saveAccessToken(data.token);
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      throw error;
    }
  }
}

export const authService = new AuthService();
