import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft, Edit3, User } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useGetProfileQuery from "../model/useProfile";

const HeaderProfile = () => {
  const { data, isLoading } = useGetProfileQuery();
  if (isLoading) return <Text>loading</Text>;
  return (
    <LinearGradient
      colors={["#2563EB", "#06B6D4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="px-6 pt-14 pb-24"
    >
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity className="w-10 h-10 items-center justify-center">
          <ChevronLeft color="white" size={24} />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Профиль</Text>
        <TouchableOpacity className="w-10 h-10 items-center justify-center">
          <Edit3 color="white" size={20} />
        </TouchableOpacity>
      </View>

      <View className="items-center flex-row">
        <View className="w-20 h-20 bg-white rounded-3xl items-center justify-center mb-3">
          <User color="#2563EB" size={40} strokeWidth={2} />
        </View>
        <View className="ml-5">
          <Text className="text-white text-2xl font-bold mb-1">
            {data.name}
          </Text>
          <Text className="text-white/80 text-sm">
            AI знает тебя лучше, чем ты думаешь
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default HeaderProfile;
