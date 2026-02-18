import { config } from "@/tamagui.config";
import { TamaguiProvider } from "@tamagui/core";
import "@tamagui/native/setup-zeego";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { queryClient } from "../app_core/lib/QueryClient";
import "../app_core/styles/global.css";
import { useAuthStore } from "../shared/model/auth.store";
import { AppSplash } from "../shared/ui/AppSplash";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments() as string[];
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const first = segments[0];
    const isPublic =
      segments.length === 0 ||
      first === "index" ||
      first === "login" ||
      first === "register";

    if (!isAuthenticated && !isPublic) {
      router.replace("/");
    }
  }, [isAuthenticated, segments, router]);

  useEffect(() => {
    const t = setTimeout(() => setAppReady(true), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (appReady) SplashScreen.hideAsync();
  }, [appReady]);

  if (!appReady) {
    return <AppSplash />;
  }

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
