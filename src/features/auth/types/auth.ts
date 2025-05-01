import { z } from "zod";
import { loginSchema } from "../dto/loginSchema";
import { registerSchema } from "../dto/registerSchema";

export type LoginData = z.infer<typeof loginSchema>;

export type RegisterData = z.infer<typeof registerSchema>;
