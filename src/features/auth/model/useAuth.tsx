import { api } from "@/src/shared/api/axiosInstance";
import { useAuthStore } from "@/src/shared/model/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { fetchGoogleAuth, fetchLogin, fetchRegister } from "../api/auth";
import { GoogleUser, LoginUser, RegisterUser } from "./auth.type";

export const useAuth = () => {
  const router = useRouter();

  const handleSuccess = (token: string) => {
    useAuthStore.getState().setToken(token);
    router.push("/(tabs)");
  };

  const handleError = (error: unknown) => {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(msg);
  };

  const loginMutation = useMutation({
    mutationFn: (params: LoginUser) => fetchLogin(params),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const registerMutation = useMutation({
    mutationFn: (params: RegisterUser) => fetchRegister(params),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const googleAuthMutation = useMutation({
    mutationFn: (params: GoogleUser) => fetchGoogleAuth(params),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const submitRegisterAuth = async (userData: RegisterUser) => {
    return registerMutation.mutateAsync(userData);
  };
  const submitLoginAuth = async (userData: LoginUser) => {
    return loginMutation.mutateAsync(userData);
  };

  const submitGoogleAuth = async (userData: GoogleUser) => {
    return googleAuthMutation.mutateAsync(userData);
  };
  console.log("REGISTER URL:", api.defaults.baseURL);

  return {
    submitLoginAuth,
    submitRegisterAuth,
    submitGoogleAuth,
    isLoading:
      loginMutation.isPending ||
      registerMutation.isPending ||
      googleAuthMutation.isPending,
  };
};
