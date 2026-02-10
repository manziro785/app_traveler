import React from "react";
import { Image, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const AppSplash = () => {
  return (
    <LinearGradient
      colors={["#1F83EB", "#0FAFD5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 items-center justify-center"
    >
      <View className="items-center">
        <Image
          source={require("../../../assets/images/splash-icon.png")}
          style={{ width: 140, height: 140 }}
        />
        <Text className="text-white text-3xl font-bold mt-6">Trip AI</Text>
        <Text className="text-white/80 text-sm mt-2">
          Your personal guide to Kyrgyzstan
        </Text>
      </View>
    </LinearGradient>
  );
};

