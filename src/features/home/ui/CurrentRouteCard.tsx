import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Skeleton } from "@/src/shared/ui/Skeleton";
import { ErrorState } from "@/src/shared/ui/ErrorState";
import { EmptyState } from "@/src/shared/ui/EmptyState";
import { useGetRoutes } from "../../route/model/useRoute";
import RouteCard from "../../route/ui/RouteCard";
import { useRouter } from "expo-router";

const CurrentRouteCard = () => {
  const router = useRouter();
  const { data: routesData, isLoading, isError, refetch } = useGetRoutes();
  if (isLoading) {
    return (
      <View className="bg-white rounded-3xl p-5 shadow-sm mb-4">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Skeleton width={90} height={16} rounded="md" className="mb-2" />
            <Skeleton width={70} height={12} rounded="md" />
          </View>
          <Skeleton width={28} height={12} rounded="md" />
        </View>
        <View className="bg-white rounded-xl p-4 shadow-sm mb-3">
          <Skeleton width={140} height={14} rounded="md" className="mb-2" />
          <Skeleton width={110} height={12} rounded="md" />
        </View>
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <Skeleton width={140} height={14} rounded="md" className="mb-2" />
          <Skeleton width={110} height={12} rounded="md" />
        </View>
      </View>
    );
  }
  const routes = routesData ?? [];

  if (isError) {
    return (
      <View className="bg-white rounded-3xl p-5 shadow-sm mb-4">
        <ErrorState
          title="Failed to load routes"
          actionLabel="Retry"
          onAction={refetch}
        />
      </View>
    );
  }

  if (routes.length === 0) {
    return (
      <View className="bg-white rounded-3xl p-5 shadow-sm mb-4">
        <EmptyState
          title="No routes yet"
          description="Create your first route and it will appear here."
          actionLabel="Create route"
          onAction={() => router.push("/createRoute")}
        />
      </View>
    );
  }

  return (
    <View className="bg-white rounded-3xl p-5 shadow-sm mb-4">
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-gray-900 font-bold text-lg">My routes</Text>
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
