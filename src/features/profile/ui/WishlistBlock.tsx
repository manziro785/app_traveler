import React from "react";
import { Text, View } from "react-native";

const WishlistBlock = () => {
  return (
    <View className="mb-4">
      <View className="bg-white rounded-3xl p-5 shadow-sm">
        <Text className="text-gray-900 font-bold text-lg mb-4">
          Хочу посетить
        </Text>
        <View className="flex-row flex-wrap gap-2">
          <View className="bg-gray-100 px-4 py-2 rounded-full">
            <Text className="text-gray-700 font-medium text-sm">son-kul</Text>
          </View>
          <View className="bg-gray-100 px-4 py-2 rounded-full">
            <Text className="text-gray-700 font-medium text-sm">karakol</Text>
          </View>
          <View className="bg-gray-100 px-4 py-2 rounded-full">
            <Text className="text-gray-700 font-medium text-sm">
              tash-rabat
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WishlistBlock;
