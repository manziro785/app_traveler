import StatsCard from "@/src/features/home/ui/StatsCard";
import { useGetRoutes } from "@/src/features/route/model/useRoute";
import RouteCard from "@/src/features/route/ui/RouteCard";
import { Link } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Skeleton } from "@/src/shared/ui/Skeleton";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Route = () => {
  const { data: routes, isLoading } = useGetRoutes();
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
              <View key={i} className="bg-white flex-row rounded-xl p-4 shadow-sm">
                <View className="w-10 h-10 bg-gray-200 rounded-full" />
                <View className="flex-1 pl-4">
                  <Skeleton width="70%" height={14} rounded="md" className="mb-2" />
                  <Skeleton width="50%" height={12} rounded="md" className="mb-3" />
                  <Skeleton width="90%" height={12} rounded="md" />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View className="pt-14  items-center justify-between px-4 bg-white">
        <View className="flex-row justify-between w-full pb-5">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="p-1">
              <ChevronLeft color="#666" size={24} />
            </TouchableOpacity>
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
          {routes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Route;
