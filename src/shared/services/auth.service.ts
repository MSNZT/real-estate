import { User } from "@/entities/user";
import { $api, $apiWithAuth } from "../api/axios";
import { tokenService } from "./token.service";
import { LoginData, RegisterData } from "@/features/auth/types/auth";

class AuthService {
  async login(loginData: LoginData) {
    try {
      const { data } = await $api.post("/auth/login", loginData);

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
      const { data } = await $api.post("/auth/register", regData);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      const { data } = await $api.post("auth/logout");
      return data;
    } catch (error) {
      throw error;
    }
  }
  async resetPassword() {}

  async accounts(): Promise<User> {
    const { data } = await $apiWithAuth.get("auth/accounts");
    return data;
  }

  async getRefreshToken() {
    const { data } = await $apiWithAuth.get<{ accessToken: string }>(
      "/auth/refresh-token"
    );

    if (data) return data;
  }

  async refreshAuthToken() {
    try {
      const token = await authService.getRefreshToken();
      if (token?.accessToken) {
        tokenService.saveAccessToken(token.accessToken);
        return token.accessToken;
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      this.logout();
      throw error;
    }
  }

  loginWithGoogle() {
    return "http://localhost:5001/api/auth/google/callback";
  }

  loginWithYandex() {
    return "http://localhost:5001/api/auth/yandex/callback";
  }
}

export const authService = new AuthService();
