import { $api, $apiWithAuth } from "../api/axios";
import { tokenService } from "./token.service";
import {
  AuthResponse,
  EmailData,
  ForgetPasswordResponse,
  LoginData,
  OAuthData,
  PasswordCodeData,
  RegisterData,
  ResetPasswordData,
  StatusResponse,
} from "@/features/auth/types/auth";

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

  async forgetPassword(dto: EmailData) {
    try {
      const { data } = await $api.post<ForgetPasswordResponse>(
        "auth/forget-password",
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
        "auth/forget-password/validate",
        dto
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(dto: ResetPasswordData) {
    try {
      const { data } = await $api.patch("auth/reset-password", dto);
    } catch (error) {}
  }

  async getMe(): Promise<AuthResponse> {
    const { data } = await $apiWithAuth.get<AuthResponse>("auth/me");
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

  async registerComplete(dto: OAuthData): Promise<AuthResponse> {
    try {
      const { data } = await $api.post<AuthResponse>(
        "oauth/register",
        {
          phone: dto.phone,
        },
        {
          params: {
            token: dto.token,
          },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async oauthValidate(token: string): Promise<{ status: string }> {
    try {
      const { data } = await $api.get<{ status: string }>("oauth/validate", {
        params: {
          token,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  loginWithGoogle() {
    return `${process.env.NEXT_PUBLIC_API_URL}/oauth/google/callback`;
  }

  loginWithYandex() {
    return `${process.env.NEXT_PUBLIC_API_URL}/oauth/yandex/callback`;
  }
}

export const authService = new AuthService();
