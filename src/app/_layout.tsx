import { config } from "@/tamagui.config";
import { TamaguiProvider } from "@tamagui/core";
import "@tamagui/native/setup-zeego";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { queryClient } from "../app_core/lib/QueryClient";
import "../app_core/styles/global.css";
import { useAuthStore } from "../shared/model/auth.store";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments() as string[];
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    const first = segments[0];

    const isPublic =
      segments.length === 0 || first === "login" || first === "register";

    if (!isAuthenticated && !isPublic) {
      router.replace("/");
    }
  }, [isAuthenticated, segments, router]);

  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="route/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="chat" options={{ headerShown: false }} />
          <Stack.Screen name="createRoute" options={{ headerShown: false }} />
          <Stack.Screen
            name="editRoute/[id]"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="explore" options={{ headerShown: false }} />
          <Stack.Screen name="editProfile" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
