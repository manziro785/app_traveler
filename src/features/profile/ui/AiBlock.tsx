import { Check, Edit2 } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const AiBlock = () => {
  return (
    <View className="mb-4">
      <View className="bg-white rounded-3xl p-5 shadow-sm">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <View className=" bg-blue-500 rounded-full items-center justify-center mr-2 p-1">
              <Check color="white" size={15} />
            </View>
            <Text className="text-gray-900 font-bold text-base">
              AI knows about you:
            </Text>
          </View>
          <TouchableOpacity className="p-2">
            <Edit2 color="#3b82f6" size={18} />
          </TouchableOpacity>
        </View>

        <View className="space-y-2">
          <View className="flex-row gap-2">
            <View className="flex-1 bg-teal-50 px-3 py-2.5 rounded-xl flex-row items-center">
              <Text className="text-base mr-2">🏞️</Text>
              <Text className="text-teal-700 text-sm font-medium flex-1">
                Природа и активности
              </Text>
            </View>
            <View className="flex-1 bg-red-50 px-3 py-2.5 rounded-xl flex-row items-center">
              <Text className="text-base mr-2">🍽️</Text>
              <Text className="text-red-700 text-sm font-medium flex-1">
                Еда и кафе
              </Text>
            </View>
          </View>

          <View className="bg-purple-50 px-3 py-2.5 rounded-xl flex-row items-center">
            <Text className="text-base mr-2">🏛️</Text>
            <Text className="text-purple-700 text-sm font-medium">
              История и культура
            </Text>
          </View>

          <View className="flex-row gap-2 mt-2">
            <View className="flex-1 bg-gray-50 px-3 py-2.5 rounded-xl flex-row items-center">
              <Text className="text-base mr-2">💰</Text>
              <Text className="text-gray-700 text-sm">Бюджет: Средний</Text>
            </View>
            <View className="flex-1 bg-gray-50 px-3 py-2.5 rounded-xl flex-row items-center">
              <Text className="text-base mr-2">👥</Text>
              <Text className="text-gray-700 text-sm">Обычно: Пара</Text>
            </View>
          </View>

          <View className="flex-row gap-2">
            <View className="flex-1 bg-gray-50 px-3 py-2.5 rounded-xl flex-row items-center">
              <Text className="text-base mr-2">🎒</Text>
              <Text className="text-gray-700 text-sm">Форма: Средняя</Text>
            </View>
            <View className="flex-1 bg-gray-50 px-3 py-2.5 rounded-xl flex-row items-center">
              <Text className="text-base mr-2">🚗</Text>
              <Text className="text-gray-700 text-sm">Без машины</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AiBlock;
