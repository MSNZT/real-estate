import { z } from "zod";
import {
  changePasswordSchema,
  codeSchema,
  emailSchema,
  loginSchema,
  phoneSchema,
  registerSchema,
} from "../schema/schema";
import { User } from "@/entities/user";

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type PhoneData = z.infer<typeof phoneSchema>;
export type EmailData = z.infer<typeof emailSchema>;
export type CodeData = z.infer<typeof codeSchema>;
export type PasswordData = z.infer<typeof changePasswordSchema>;

export type AuthResponse = {
  user: User;
  token: string;
};

export type OAuthData = {
  phone: string;
  token: string;
};

export type ForgetPasswordResponse = {
  message: string;
  status: string;
  domain: string;
};

export type PasswordCodeData = {
  email: string;
  code: string;
};

export type ResetPasswordData = {
  email: string;
  code: string;
  password: string;
};

export type StatusResponse = {
  status: string;
};
