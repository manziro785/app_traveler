import { useAuthStore } from "@/src/shared/model/auth.store";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { fetchGoogleAuth, fetchLogin, fetchRegister } from "../api/auth";
import { AuthResponse, GoogleUser, LoginUser, RegisterUser } from "./auth.type";

export const useAuth = () => {
  const router = useRouter();

  const handleSuccess = (data: AuthResponse) => {
    useAuthStore.getState().setToken(data.token);
    router.push("/(tabs)");
  };

  const extractServerMessage = (error: unknown): string => {
    if (!isAxiosError(error)) {
      return error instanceof Error ? error.message : "Unknown error";
    }

    const raw = error.response?.data;
    if (typeof raw === "string") return raw;
    if (raw && typeof raw === "object") {
      const message = (raw as { message?: unknown }).message;
      if (typeof message === "string") return message;
      if (Array.isArray(message)) return message.join(", ");
    }

    return error.message;
  };

  const handleAuthError = (
    error: unknown,
    mode: "login" | "register" | "google",
  ) => {
    const status = isAxiosError(error) ? error.response?.status : undefined;
    const serverMessage = extractServerMessage(error).toLowerCase();

    if (
      mode === "register" &&
      (status === 409 ||
        serverMessage.includes("already") ||
        serverMessage.includes("exists"))
    ) {
      Alert.alert("Registration", "This email is already taken.");
      return;
    }

    if (
      mode === "login" &&
      (status === 401 ||
        status === 403 ||
        serverMessage.includes("invalid") ||
        serverMessage.includes("credential"))
    ) {
      Alert.alert("Login", "Invalid email or password.");
      return;
    }

    if (status === 0 || serverMessage.includes("network")) {
      Alert.alert(
        "Network error",
        "Check your internet connection and try again.",
      );
      return;
    }

    const fallbackTitle =
      mode === "register"
        ? "Registration error"
        : mode === "login"
          ? "Login error"
          : "Google login error";

    Alert.alert(
      fallbackTitle,
      "Failed to complete the request. Please try again.",
    );
    console.error("Auth error:", extractServerMessage(error));
  };

  const loginMutation = useMutation({
    mutationFn: (params: LoginUser) => fetchLogin(params),
    onSuccess: handleSuccess,
    onError: (error) => handleAuthError(error, "login"),
  });

  const registerMutation = useMutation({
    mutationFn: (params: RegisterUser) => fetchRegister(params),
    onSuccess: handleSuccess,
    onError: (error) => handleAuthError(error, "register"),
  });

  const googleAuthMutation = useMutation({
    mutationFn: (params: GoogleUser) => fetchGoogleAuth(params),
    onSuccess: handleSuccess,
    onError: (error) => handleAuthError(error, "google"),
  });

  const submitRegisterAuth = async (userData: RegisterUser) => {
    try {
      return await registerMutation.mutateAsync(userData);
    } catch {
      return null;
    }
  };

  const submitLoginAuth = async (userData: LoginUser) => {
    try {
      return await loginMutation.mutateAsync(userData);
    } catch {
      return null;
    }
  };

  const submitGoogleAuth = async (userData: GoogleUser) => {
    try {
      return await googleAuthMutation.mutateAsync(userData);
    } catch {
      return null;
    }
  };

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
