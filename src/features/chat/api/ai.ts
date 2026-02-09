import { api } from "@/src/shared/api/axiosInstance";

export const chatActions = async (formData) => {
  const res = await api.post("/ai/chat", formData);
  return res.data;
};
