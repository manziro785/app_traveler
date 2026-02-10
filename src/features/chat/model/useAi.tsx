import { useMutation } from "@tanstack/react-query";
import { chatActions } from "../api/ai";

export const useChat = () => {
  return useMutation({
    mutationFn: (params: { message: string }) => chatActions(params),
    onSuccess: (data) => {
      console.log("Chat response received:", data);
    },
    onError: (error: unknown) => {
      const msg = error instanceof Error ? error.message : String(error);
      console.error("Chat error:", msg);
    },
  });
};
