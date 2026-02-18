import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { Skeleton } from "@/src/shared/ui/Skeleton";

export default function RouteDetailsSkeleton() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3b82f6" />
      <LinearGradient
        colors={["#1F83EB", "#0FAFD5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="p-2 py-14"
      >
        <View className="flex-row items-center justify-between mb-4">
          <View className="p-2">
            <ChevronLeft color="#fff" size={24} />
          </View>
          <View className="flex-row gap-3">
            <View className="p-2">
              <Skeleton width={18} height={18} rounded="md" />
            </View>
          </View>
        </View>
        <View className="mx-5">
          <View className="bg-white/20 self-start px-3 py-1 rounded-full mb-2">
            <Skeleton width={60} height={10} rounded="md" />
          </View>
          <Skeleton width="70%" height={22} rounded="md" className="mb-2" />
          <Skeleton width="90%" height={12} rounded="md" className="mb-4" />
          <View className="flex-row items-center gap-4">
            <Skeleton width={70} height={12} rounded="md" />
            <Skeleton width={90} height={12} rounded="md" />
            <Skeleton width={80} height={12} rounded="md" />
          </View>
        </View>
      </LinearGradient>
      <View className="flex-row items-center justify-center gap-2 bg-white mx-4 -mt-6 rounded-xl px-4 py-3 shadow-sm mb-4">
        <Skeleton width={160} height={14} rounded="md" />
      </View>
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="relative pb-24">
          {[1, 2, 3].map((i) => (
            <View key={i} className="flex-row mb-6">
              <View className="items-center mr-4">
                <View className="w-12 h-12 bg-gray-200 rounded-3xl" />
                {i < 3 && (
                  <View className="w-0.5 h-full bg-gray-200 absolute top-12" />
                )}
              </View>
              <View className="flex-1 bg-white rounded-xl p-4 shadow-sm">
                <Skeleton width="70%" height={14} rounded="md" className="mb-2" />
                <Skeleton width="90%" height={12} rounded="md" className="mb-3" />
                <Skeleton width="60%" height={12} rounded="md" />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
