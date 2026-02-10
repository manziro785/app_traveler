import React from "react";
import { Text, View } from "react-native";
import { Skeleton } from "@/src/shared/ui/Skeleton";
import { useGetStatsQuery } from "../model/useHome";

const StatsCard = () => {
  const { data, isLoading } = useGetStatsQuery();
  if (isLoading) {
    return (
      <View className="flex-row justify-between gap-3 mb-5">
        {[1, 2, 3].map((i) => (
          <View
            key={i}
            className="flex-1 bg-white rounded-2xl p-4 items-center shadow-lg"
          >
            <Skeleton width={44} height={22} rounded="md" className="mb-2" />
            <Skeleton width={52} height={10} rounded="md" />
          </View>
        ))}
      </View>
    );
  }
  return (
    <View className="flex-row justify-between gap-3 mb-5">
      <View className="flex-1 bg-white rounded-2xl p-4 items-center shadow-lg">
        <Text className="text-blue-500 text-2xl font-bold mb-1">
          {data.visitedPlaces}
        </Text>
        <Text className="text-gray-500 text-xs">Places</Text>
      </View>
      <View className="flex-1 bg-white rounded-2xl p-4 items-center shadow-lg">
        <Text className="text-green-500 text-2xl font-bold mb-1">
          {data.totalRoutes}
        </Text>
        <Text className="text-gray-500 text-xs">Routes</Text>
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
