import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../model/useAuth";

WebBrowser.maybeCompleteAuthSession();

type Props = { title_google: string };

export default function GoogleForm({ title_google }: Props) {
  const androidClientId = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;
  const expoClientId = process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID;

  if (!androidClientId) {
    console.error("Google auth disabled");

    return (
      <TouchableOpacity
        className="bg-gray-900/50 rounded-2xl py-4 flex-row items-center justify-center gap-3"
        activeOpacity={1}
        disabled
      >
        <View className="w-5 h-5 bg-white rounded-full items-center justify-center">
          <Text className="text-xs">G</Text>
        </View>
        <Text className="text-white text-base">Google login unavailable</Text>
      </TouchableOpacity>
    );
  }

  return (
    <GoogleFormEnabled
      title_google={title_google}
      androidClientId={androidClientId}
      expoClientId={expoClientId}
    />
  );
}

type EnabledProps = {
  title_google: string;
  androidClientId: string;
  expoClientId: string | undefined;
};

function GoogleFormEnabled({
  title_google,
  androidClientId,
  expoClientId,
}: EnabledProps) {
  const { submitGoogleAuth, isLoading } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId,
    androidClientId,
    scopes: ["profile", "email"],
  });

  React.useEffect(() => {
    const run = async () => {
      if (response?.type !== "success") return;

      const accessToken = response.authentication?.accessToken;
      if (!accessToken) return;

      const userInfoResponse = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );

      if (!userInfoResponse.ok) {
        throw new Error("Failed to fetch user info from Google");
      }

      const userInfo = await userInfoResponse.json();

      await submitGoogleAuth({
        email: userInfo.email,
        name: userInfo.name,
        googleId: userInfo.sub,
        picture: userInfo.picture,
      });
    };

    run().catch((e) => console.error("Google auth failed:", e));
  }, [response, submitGoogleAuth]);

  return (
    <TouchableOpacity
      className="bg-gray-900/80 rounded-2xl py-4 flex-row items-center justify-center gap-3"
      activeOpacity={0.8}
      disabled={!request || isLoading}
      onPress={() => promptAsync({ useProxy: true })}
    >
      <View className="w-5 h-5 bg-white rounded-full items-center justify-center">
        <Text className="text-xs">G</Text>
      </View>
      <Text className="text-white text-base">{title_google} with Google</Text>
    </TouchableOpacity>
  );
}
