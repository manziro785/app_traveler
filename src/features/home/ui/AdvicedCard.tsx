import { LinearGradient } from "expo-linear-gradient";
import { Lightbulb } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Skeleton } from "@/src/shared/ui/Skeleton";
import { ErrorState } from "@/src/shared/ui/ErrorState";
import { EmptyState } from "@/src/shared/ui/EmptyState";
import { useGetInsightsQuery } from "../model/useHome";

const AdvicedCard = () => {
  const { data, isLoading, isError, refetch } = useGetInsightsQuery();
  if (isLoading) {
    return (
      <View className="bg-white rounded-3xl p-5 shadow-sm mb-4">
        <View className="flex-row items-center mb-6">
          <View className="w-12 h-12 bg-orange-400 rounded-2xl items-center justify-center mr-3" />
          <View className="flex-1">
            <Skeleton width={120} height={16} rounded="md" className="mb-2" />
            <Skeleton width={180} height={12} rounded="md" />
          </View>
        </View>
        {[1, 2].map((i) => (
          <View key={i} className="border border-1 border-gray-200 rounded-2xl p-4 mb-2">
            <View className="flex-row items-start">
              <View className="w-10 h-10 bg-gray-100 rounded-xl mr-3" />
              <View className="flex-1">
                <Skeleton width={100} height={12} rounded="md" className="mb-2" />
                <Skeleton width="90%" height={12} rounded="md" />
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
  if (isError) {
    return (
      <View className="bg-white rounded-3xl p-5 shadow-sm mb-4">
        <ErrorState
          title="Failed to load tips"
          actionLabel="Retry"
          onAction={refetch}
        />
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View className="bg-white rounded-3xl p-5 shadow-sm mb-4">
        <EmptyState
          title="No recommendations yet"
          description="We’ll show tips when they become available."
        />
      </View>
    );
  }
  return (
    <View className="bg-white rounded-3xl p-5 shadow-sm mb-4">
      <View className="flex-row items-center mb-6">
        <View className="w-12 h-12 bg-orange-400 rounded-2xl items-center justify-center mr-3">
          <LinearGradient
            colors={["#FF7A56", "#FFAC11"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Lightbulb color="white" size={24} />
          </LinearGradient>
        </View>
        <View className="flex-1">
          <Text className="text-gray-900 font-bold text-lg">
            Local insights
          </Text>
          <Text className="text-gray-500 text-sm">
            What you won't find in guides
          </Text>
        </View>
      </View>
      {data?.map((insight) => (
        <View className="space-y-3" key={insight.id}>
          <TouchableOpacity className="border border-1 border-gray-200 rounded-2xl p-4 mb-2">
            <View className="flex-row items-start justify-between">
              <View className="flex-row items-start flex-1">
                <View className="w-10 h-10 bg-[#FFF3D2] rounded-xl items-center justify-center mr-3">
                  <Lightbulb color="#EAB308" size={20} />
                </View>
                <View className="flex-1">
                  <Text className="text-yellow-600 font-semibold text-sm mb-1">
                    {insight.category}
                  </Text>
                  <Text className="text-gray-700 text-sm leading-5">
                    {insight.title}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default AdvicedCard;
