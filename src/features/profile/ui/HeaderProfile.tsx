import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ChevronLeft, User } from "lucide-react-native";
import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGetProfileQuery } from "../model/useProfile";
import { Skeleton } from "@/src/shared/ui/Skeleton";

const HeaderProfile = () => {
  const router = useRouter();
  const { data, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return (
      <LinearGradient
        colors={["#2563EB", "#06B6D4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 pt-14 pb-24"
      >
        <View className="flex-row items-center justify-between mb-6">
          <View className="w-10 h-10" />
          <Skeleton width={90} height={18} rounded="md" />
          <View className="w-10 h-10" />
        </View>

        <View className="items-center flex-row">
          <Skeleton width={80} height={80} rounded="xl" />
          <View className="ml-5">
            <Skeleton width={140} height={20} rounded="md" className="mb-2" />
            <Skeleton width={160} height={12} rounded="md" />
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <>
      <LinearGradient
        colors={["#2563EB", "#06B6D4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 pt-14 pb-24"
      >
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity
            className="w-10 h-10 items-center justify-center"
            onPress={() => router.back()}
          >
            <ChevronLeft color="white" size={24} />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Profile</Text>
          <View></View>
        </View>

        <View className="items-center flex-row">
          {data?.avatar ? (
            <Image
              source={{ uri: data.avatar }}
              className="w-20 h-20 rounded-3xl mb-3"
            />
          ) : (
            <View className="w-20 h-20 bg-white rounded-3xl items-center justify-center mb-3">
              <User color="#2563EB" size={40} strokeWidth={2} />
            </View>
          )}

          <View className="ml-5">
            <Text className="text-white text-2xl font-bold mb-1">
              {data?.name || "User"}
            </Text>
            <Text className="text-white/80 text-sm">
              {data?.email || "user@example.com"}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default HeaderProfile;
