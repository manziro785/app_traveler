import React from "react";
import { ScrollView, View } from "react-native";
import { Skeleton } from "@/src/shared/ui/Skeleton";

export default function RouteListSkeleton() {
  return (
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
  );
}
