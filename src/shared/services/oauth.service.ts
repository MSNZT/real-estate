import { AuthResponse, OAuthData } from "@/features/auth/types/auth";
import { $api } from "../api/lib/axios";
import { OAUTH_ENDPOINTS } from "../api/endpoints";
import { API_URL } from "../config/environment";

class OAuthService {
  async registerComplete(dto: OAuthData): Promise<AuthResponse> {
    try {
      const { data } = await $api.post<AuthResponse>(
        OAUTH_ENDPOINTS.register,
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

  async validate(token: string): Promise<{ status: string }> {
    try {
      const { data } = await $api.get<{ status: string }>(
        OAUTH_ENDPOINTS.validate,
        {
          params: {
            token,
          },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  loginWithGoogle() {
    return `${API_URL}${OAUTH_ENDPOINTS.loginGoogle}`;
  }

  loginWithYandex() {
    return `${API_URL}${OAUTH_ENDPOINTS.loginYandex}`;
  }
}

export const oauthService = new OAuthService();
