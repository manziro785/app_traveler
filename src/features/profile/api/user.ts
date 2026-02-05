import { api } from "@/src/shared/api/axiosInstance";

export const fetchProfile = async () => {
  const res = await api.get("/auth/me");
  return res.data.data;
};
