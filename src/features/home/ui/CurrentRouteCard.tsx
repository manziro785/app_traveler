import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useGetRoutes from "../../route/model/useRoute";
import RouteCard from "../../route/ui/RouteCard";

const CurrentRouteCard = () => {
  const { data: routes, isLoading } = useGetRoutes();
  if (isLoading) return <Text>loading...</Text>;

  return (
    <View className="bg-white rounded-3xl p-5 shadow-sm mb-4">
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-gray-900 font-bold text-lg">Мои маршруты</Text>
          <Text className="text-gray-500 text-sm">{routes.length} active</Text>
        </View>
        <Link asChild href="/(tabs)/route">
          <TouchableOpacity>
            <Text className="text-blue-500 font-semibold text-sm">All</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {routes.slice(0, 2).map((route) => (
        <RouteCard key={route.id} route={route} />
      ))}
    </View>
  );
};

export default CurrentRouteCard;
