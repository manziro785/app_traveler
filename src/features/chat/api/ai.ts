import { api } from "@/src/shared/api/axiosInstance";
import type { ChatRequest, ChatResponse } from "../model/chat.type";

export const chatActions = async (
  formData: ChatRequest,
): Promise<ChatResponse> => {
  const res = await api.post("/ai/chat", formData);
  return res.data;
};
