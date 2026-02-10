import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

type ErrorProps = {
  error?: Error;
  retry?: () => void;
};

export default function GlobalError({ error, retry }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  const handleRetry = () => {
    if (retry) return retry();
    router.replace("/");
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-2xl font-bold text-gray-900 mb-2">
        Something went wrong
      </Text>
      <Text className="text-sm text-gray-500 text-center mb-6">
        An error occurred. Try again or go back home.
      </Text>
      <TouchableOpacity
        onPress={handleRetry}
        className="bg-blue-600 px-6 py-3 rounded-xl"
      >
        <Text className="text-white font-semibold">Try again</Text>
      </TouchableOpacity>
    </View>
  );
}
