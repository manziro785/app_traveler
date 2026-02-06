import { config } from "@/tamagui.config";
import { TamaguiProvider } from "@tamagui/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { queryClient } from "../app_core/lib/QueryClient";
import "../app_core/styles/global.css";

export default function RootLayout() {
  const clientId_key = process.env.CLIENT_ID;
  return (
    // <GoogleOAuthProvider clientId={clientId_key}>
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
        </Stack>
      </QueryClientProvider>
    </TamaguiProvider>
    // </GoogleOAuthProvider>
  );
}
