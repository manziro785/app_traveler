import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function NotFound() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-2xl font-bold text-gray-900 mb-2">
        Page not found
      </Text>
      <Text className="text-sm text-gray-500 text-center mb-6">
        That page doesn’t exist. Go back to the home screen.
      </Text>
      <TouchableOpacity
        onPress={() => router.replace("/")}
        className="bg-blue-600 px-6 py-3 rounded-xl"
      >
        <Text className="text-white font-semibold">Go home</Text>
      </TouchableOpacity>
    </View>
  );
}
