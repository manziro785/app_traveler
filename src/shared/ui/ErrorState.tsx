import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ErrorStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const ErrorState = ({
  title = "Error",
  description = "Something went wrong. Please try again.",
  actionLabel,
  onAction,
}: ErrorStateProps) => {
  return (
    <View className="items-center justify-center py-6 px-4">
      <Text className="text-base font-semibold text-gray-900 mb-2">
        {title}
      </Text>
      <Text className="text-sm text-gray-500 text-center mb-4">
        {description}
      </Text>
      {actionLabel && onAction && (
        <TouchableOpacity
          onPress={onAction}
          className="bg-blue-600 px-5 py-2.5 rounded-lg"
        >
          <Text className="text-white font-semibold text-sm">
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
