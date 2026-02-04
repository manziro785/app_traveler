import { LinearGradient } from "expo-linear-gradient";
import { MapPin } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CurrentRouteCard = () => {
  return (
    <View className="bg-white rounded-3xl p-5 shadow-sm mb-4">
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-gray-900 font-bold text-lg">Мои маршруты</Text>
          <Text className="text-gray-500 text-sm">2 активных</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-blue-500 font-semibold text-sm">Все →</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="flex-row items-center bg-gray-50 rounded-2xl p-4 mb-3">
        <View className="w-12 h-12 rounded-2xl items-center justify-center mr-3">
          <LinearGradient
            colors={["#286BF7", "#06C8C8"]}
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
            <MapPin color="white" size={20} />
          </LinearGradient>
        </View>
        <View className="flex-1">
          <Text className="text-gray-900 font-bold text-base mb-1">
            Атмосферный Бишкек
          </Text>
          <Text className="text-gray-500 text-sm">
            Бишкек • 3 ч • ~1200 сом
          </Text>
        </View>
        <Text className="text-gray-400">›</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center bg-gray-50 rounded-2xl p-4">
        <View className="w-12 h-12  rounded-2xl items-center justify-center mr-3">
          <LinearGradient
            colors={["#286BF7", "#06C8C8"]}
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
            <MapPin color="white" size={20} />
          </LinearGradient>
        </View>
        <View className="flex-1">
          <Text className="text-gray-900 font-bold text-base mb-1">
            Иссык-Куль выходные
          </Text>
          <Text className="text-gray-500 text-sm">
            Иссык-Куль • 2 дн • ~8500 сом
          </Text>
        </View>
        <Text className="text-gray-400">›</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CurrentRouteCard;
