import React from "react";
import { Text, View } from "react-native";
import { useGetStatsQuery } from "../model/useHome";

const StatsCard = () => {
  const { data, isLoading } = useGetStatsQuery();
  if (isLoading) return <Text>loading</Text>;
  return (
    <View className="flex-row justify-between gap-3 mb-5">
      <View className="flex-1 bg-white rounded-2xl p-4 items-center shadow-lg">
        <Text className="text-blue-500 text-2xl font-bold mb-1">
          {data.visitedPlaces}
        </Text>
        <Text className="text-gray-500 text-xs">Мест</Text>
      </View>
      <View className="flex-1 bg-white rounded-2xl p-4 items-center shadow-lg">
        <Text className="text-green-500 text-2xl font-bold mb-1">
          {data.totalRoutes}
        </Text>
        <Text className="text-gray-500 text-xs">Маршрутов</Text>
      </View>
      <View className="flex-1 bg-white rounded-2xl p-4 items-center shadow-lg">
        <Text className="text-blue-500 text-2xl font-bold mb-1">
          {data.wishlistCount}
        </Text>
        <Text className="text-gray-500 text-xs">Wishlist</Text>
      </View>
    </View>
  );
};

export default StatsCard;
