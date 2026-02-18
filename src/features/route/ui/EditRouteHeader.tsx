import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft, Save } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

type EditRouteHeaderProps = {
  isPending: boolean;
  onBack: () => void;
  onSave: () => void;
};

export default function EditRouteHeader({
  isPending,
  onBack,
  onSave,
}: EditRouteHeaderProps) {
  return (
    <LinearGradient
      colors={["#1F83EB", "#0FAFD5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="pt-14 pb-6"
    >
      <View className="flex-row items-center justify-between px-4">
        <Pressable onPress={onBack} className="p-2 active:opacity-70">
          <ChevronLeft color="#fff" size={24} />
        </Pressable>
        <Text className="text-white text-xl font-bold">Edit Route</Text>
        <Pressable
          onPress={onSave}
          disabled={isPending}
          className={`p-2 active:opacity-70 ${isPending ? "opacity-50" : ""}`}
        >
          <Save color="#fff" size={24} />
        </Pressable>
      </View>
    </LinearGradient>
  );
}
