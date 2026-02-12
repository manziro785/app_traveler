import StatsCard from "@/src/features/home/ui/StatsCard";
import { useGetRoutes } from "@/src/features/route/model/useRoute";
import RouteCard from "@/src/features/route/ui/RouteCard";
import { EmptyState } from "@/src/shared/ui/EmptyState";
import { ErrorState } from "@/src/shared/ui/ErrorState";
import { Skeleton } from "@/src/shared/ui/Skeleton";
import { Link, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Route = () => {
  const router = useRouter();
  const { data: routesData, isLoading, isError, refetch } = useGetRoutes();
  if (isLoading) {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View className="pt-14  items-center justify-between px-4 bg-white">
          <View className="flex-row justify-between w-full pb-5">
            <View className="flex-row items-center gap-3">
              <TouchableOpacity className="p-1">
                <ChevronLeft color="#666" size={24} />
              </TouchableOpacity>
              <Skeleton width={120} height={18} rounded="md" />
            </View>
            <View className="bg-blue-100 px-4 py-1.5 rounded-full">
              <Skeleton width={40} height={12} rounded="md" />
            </View>
          </View>
          <StatsCard />
        </View>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="p-4 px-6 gap-3 pb-24">
            {[1, 2, 3].map((i) => (
              <View
                key={i}
                className="bg-white flex-row rounded-xl p-4 shadow-sm"
              >
                <View className="w-10 h-10 bg-gray-200 rounded-full" />
                <View className="flex-1 pl-4">
                  <Skeleton
                    width="70%"
                    height={14}
                    rounded="md"
                    className="mb-2"
                  />
                  <Skeleton
                    width="50%"
                    height={12}
                    rounded="md"
                    className="mb-3"
                  />
                  <Skeleton width="90%" height={12} rounded="md" />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </>
    );
  }
  const routes = routesData ?? [];
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
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View className="pt-14  items-center justify-between px-4 bg-white">
        <View className="flex-row justify-between w-full pb-5">
          <View className="flex-row items-center gap-3">
            <Link href="/(tabs)" asChild>
              <TouchableOpacity className="p-1">
                <ChevronLeft color="#666" size={24} />
              </TouchableOpacity>
            </Link>
            <Text className="text-xl font-extrabold  text-gray-900">
              My routes
            </Text>
          </View>
          <Link href="/createRoute" asChild>
            <TouchableOpacity className="bg-blue-600 px-4 py-1.5 rounded-full">
              <Text className="text-white text-sm  font-medium">+ New</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <StatsCard />
      </View>

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
