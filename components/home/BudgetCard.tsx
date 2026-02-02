import { LinearGradient } from "expo-linear-gradient";
import {
  Bus,
  Package,
  Ticket,
  UtensilsCrossed,
  Wallet,
} from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const BudgetCard = () => {
  return (
    <View className="rounded-3xl bg-white p-5 shadow-xl my-4">
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-xl overflow-hidden mr-3">
            <LinearGradient
              colors={["#2672F4", "#08C3CB"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              className="w-full h-full items-center justify-center"
            >
              <Wallet color="#FFFF" size={20} />
            </LinearGradient>
          </View>
          <View>
            <Text className="text-gray-800 font-bold text-base">
              Бюджет дня
            </Text>
            <Text className="text-gray-500 text-sm">Осталось: 550 сом</Text>
          </View>
        </View>
      </View>

      <View className="items-center my-4">
        <View className="relative">
          <View className="w-32 h-32 rounded-full border-8 border-gray-100 items-center justify-center">
            <View
              className="absolute w-32 h-32 rounded-full border-8 border-cyan-400"
              style={{
                borderTopColor: "#22D3EE",
                borderRightColor: "#22D3EE",
                borderBottomColor: "transparent",
                borderLeftColor: "transparent",
                transform: [{ rotate: "-45deg" }],
              }}
            />
            <View className="items-center">
              <Text className="text-3xl font-bold text-gray-900">950</Text>
              <Text className="text-gray-500 text-sm">/ 1500</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="space-y-3 ">
        <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
          <View className="flex-row items-center flex-1">
            <View className="w-10 h-10 bg-pink-50 rounded-xl items-center justify-center mr-3">
              <UtensilsCrossed color="#EC4899" size={18} />
            </View>
            <Text className="text-gray-700 font-medium">Еда</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-gray-900 font-bold text-base mr-3">
              450 сом
            </Text>
            <TouchableOpacity className="w-6 h-6 bg-gray-100 rounded-full items-center justify-center">
              <Text className="text-gray-600 text-lg font-bold">−</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-6 h-6 bg-cyan-100 rounded-full items-center justify-center ml-2">
              <Text className="text-cyan-600 text-lg font-bold">+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
          <View className="flex-row items-center flex-1">
            <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center mr-3">
              <Bus color="#3B82F6" size={18} />
            </View>
            <Text className="text-gray-700 font-medium">Транспорт</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-gray-900 font-bold text-base mr-3">
              200 сом
            </Text>
            <TouchableOpacity className="w-6 h-6 bg-gray-100 rounded-full items-center justify-center">
              <Text className="text-gray-600 text-lg font-bold">−</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-6 h-6 bg-cyan-100 rounded-full items-center justify-center ml-2">
              <Text className="text-cyan-600 text-lg font-bold">+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
          <View className="flex-row items-center flex-1">
            <View className="w-10 h-10 bg-purple-50 rounded-xl items-center justify-center mr-3">
              <Ticket color="#A855F7" size={18} />
            </View>
            <Text className="text-gray-700 font-medium">Входные</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-gray-900 font-bold text-base mr-3">
              200 сом
            </Text>
            <TouchableOpacity className="w-6 h-6 bg-gray-100 rounded-full items-center justify-center">
              <Text className="text-gray-600 text-lg font-bold">−</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-6 h-6 bg-cyan-100 rounded-full items-center justify-center ml-2">
              <Text className="text-cyan-600 text-lg font-bold">+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-center justify-between py-3">
          <View className="flex-row items-center flex-1">
            <View className="w-10 h-10 bg-cyan-50 rounded-xl items-center justify-center mr-3">
              <Package color="#06B6D4" size={18} />
            </View>
            <Text className="text-gray-700 font-medium">Прочее</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-gray-900 font-bold text-base mr-3">
              100 сом
            </Text>
            <TouchableOpacity className="w-6 h-6 bg-gray-100 rounded-full items-center justify-center">
              <Text className="text-gray-600 text-lg font-bold">−</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-6 h-6 bg-cyan-100 rounded-full items-center justify-center ml-2">
              <Text className="text-cyan-600 text-lg font-bold">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="mt-4 pt-4 border-t border-gray-100">
        <Text className="text-center text-gray-500 text-sm">
          Осталось на:
          <Text className="text-cyan-600 font-semibold">ужин + транспорт</Text>
        </Text>
      </View>
    </View>
  );
};

export default BudgetCard;
