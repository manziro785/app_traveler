import { api } from "@/src/shared/api/axiosInstance";
import {
  AuthResponse,
  GoogleUser,
  LoginUser,
  RegisterUser,
} from "../model/auth.type";

export const fetchLogin = async (
  userData: LoginUser,
): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", userData);
  return res.data;
};

export const fetchRegister = async (
  userData: RegisterUser,
): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

export const fetchGoogleAuth = async (
  googleData: GoogleUser,
): Promise<AuthResponse> => {
  const res = await api.post("/auth/google", googleData);
  return res.data;
};
