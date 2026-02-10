import { useMutation } from "@tanstack/react-query";
import { chatActions } from "../api/ai";
import type { ChatRequest, ChatResponse } from "./chat.type";

export const useChat = () => {
  return useMutation<ChatResponse, unknown, ChatRequest>({
    mutationFn: (params) => chatActions(params),
    onSuccess: (data) => {
      console.log("Chat response received:", data);
    },
    onError: (error: unknown) => {
      const msg = error instanceof Error ? error.message : String(error);
      console.error("Chat error:", msg);
    },
  });
};
