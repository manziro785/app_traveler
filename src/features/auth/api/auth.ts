import { api } from "@/src/shared/api/axiosInstance";
import { GoogleUser, LoginUser, RegisterUser } from "../model/auth.type";

export const fetchLogin = async (userData: LoginUser) => {
  const res = await api.post("/auth/login", userData);
  return res.data;
};

export const fetchRegister = async (userData: RegisterUser) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

export const fetchGoogleAuth = async (googleData: GoogleUser) => {
  const res = await api.post("/auth/google", googleData);
  return res.data;
};
