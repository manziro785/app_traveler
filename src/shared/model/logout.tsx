import { queryClient } from "@/src/app_core/lib/QueryClient";
import { useRouter } from "expo-router";
import { useAuthStore } from "./auth.store";

export const useLogout = () => {
  const router = useRouter();

  return () => {
    useAuthStore.getState().logout();
    queryClient.clear();
    router.dismissAll();
    router.replace("/");
  };
};
