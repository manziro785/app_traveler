import type { LucideIcon } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function OptionCard({
  label,
  icon: Icon,
  isSelected,
  onPress,
}: {
  label: string;
  icon: LucideIcon;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-5 items-center border-2"
      style={{
        width: "47%",
        borderColor: isSelected ? "#2E5BFF" : "#E5E7EB",
        backgroundColor: isSelected ? "#EDF2FF" : "#FFFFFF",
      }}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View className="mb-2">
        <Icon size={32} color={isSelected ? "#2E5BFF" : "#6B7280"} />
      </View>
      <Text className="text-sm font-medium" style={{ color: "#6B7280" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
