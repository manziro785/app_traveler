import { useGetRoutes } from "@/src/features/route/model/useRoute";
import RouteCard from "@/src/features/route/ui/RouteCard";
import RouteListSkeleton from "@/src/features/route/ui/RouteListSkeleton";
import RoutesScreenHeader from "@/src/features/route/ui/RoutesScreenHeader";
import { EmptyState } from "@/src/shared/ui/EmptyState";
import { ErrorState } from "@/src/shared/ui/ErrorState";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

const Route = () => {
  const router = useRouter();
  const { data: routesData, isLoading, isError, refetch } = useGetRoutes();
  const routes = routesData ?? [];

  if (isLoading) {
    return (
      <>
        <RoutesScreenHeader isLoading />
        <RouteListSkeleton />
      </>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 bg-white px-4 pt-20">
        <ErrorState
          title="Failed to load routes"
          actionLabel="Retry"
          onAction={refetch}
        />
      </View>
    );
  }

  return (
    <>
      <RoutesScreenHeader />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="bg-white border-b border-gray-200 ">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-6 py-3"
            contentContainerStyle={{ gap: 8 }}
          ></ScrollView>
        </View>
        <View className="p-4 px-6 gap-3 pb-24">
          {routes.length === 0 ? (
            <EmptyState
              title="No routes yet"
              description="Create your first route to see it here."
              actionLabel="Create route"
              onAction={() => router.push("/createRoute")}
            />
          ) : (
            routes.map((route) => <RouteCard key={route.id} route={route} />)
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Route;
