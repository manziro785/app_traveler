import StatsCard from "@/src/features/home/ui/StatsCard";
import { Skeleton } from "@/src/shared/ui/Skeleton";
import { Link } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

type RoutesScreenHeaderProps = {
  isLoading?: boolean;
};

export default function RoutesScreenHeader({
  isLoading = false,
}: RoutesScreenHeaderProps) {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View className="pt-14 items-center justify-between px-4 bg-white">
        <View className="flex-row justify-between w-full pb-5">
          <View className="flex-row items-center gap-3">
            {isLoading ? (
              <View className="p-1">
                <ChevronLeft color="#666" size={24} />
              </View>
            ) : (
              <Link href="/(tabs)" asChild>
                <TouchableOpacity className="p-1">
                  <ChevronLeft color="#666" size={24} />
                </TouchableOpacity>
              </Link>
            )}

            {isLoading ? (
              <Skeleton width={120} height={18} rounded="md" />
            ) : (
              <Text className="text-xl font-extrabold text-gray-900">
                My routes
              </Text>
            )}
          </View>

          {isLoading ? (
            <View className="bg-blue-100 px-4 py-1.5 rounded-full">
              <Skeleton width={40} height={12} rounded="md" />
            </View>
          ) : (
            <Link href="/createRoute" asChild>
              <TouchableOpacity className="bg-blue-600 px-4 py-1.5 rounded-full">
                <Text className="text-white text-sm font-medium">+ New</Text>
              </TouchableOpacity>
            </Link>
          )}
        </View>

        <StatsCard />
      </View>
    </>
  );
}
