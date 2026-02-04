import { LinearGradient } from "expo-linear-gradient";
import { Lightbulb, Star } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const AdvicedCard = () => {
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
            Локальные инсайты
          </Text>
          <Text className="text-gray-500 text-sm">
            То, что не найдешь в гидах
          </Text>
        </View>
      </View>

      <View className="space-y-3">
        <TouchableOpacity className="border border-1 border-gray-200 rounded-2xl p-4 mb-2">
          <View className="flex-row items-start justify-between">
            <View className="flex-row items-start flex-1">
              <View className="w-10 h-10 bg-[#FFF3D2] rounded-xl items-center justify-center mr-3">
                <Lightbulb color="#EAB308" size={20} />
              </View>
              <View className="flex-1">
                <Text className="text-yellow-600 font-semibold text-sm mb-1">
                  Лайфхак
                </Text>
                <Text className="text-gray-700 text-sm leading-5">
                  Не бери такси у вокзала, выйди на улицу — в 2 раза дешевле
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="border border-1 border-gray-200 rounded-2xl p-4 mb-2">
          <View className="flex-row items-start justify-between">
            <View className="flex-row items-start flex-1">
              <View className="w-10 h-10 bg-purple-100 rounded-xl items-center justify-center mr-3">
                <Star color="#A855F7" size={20} />
              </View>
              <View className="flex-1">
                <Text className="text-purple-600 font-semibold text-sm mb-1">
                  Секрет
                </Text>
                <Text className="text-gray-700 text-sm leading-5">
                  Вход в ущелье Ала-Арча бесплатный до 8 утра
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="border border-1 border-gray-200 rounded-2xl p-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-row items-start flex-1">
              <View className="w-10 h-10 bg-purple-100 rounded-xl items-center justify-center mr-3">
                <Star color="#A855F7" size={20} />
              </View>
              <View className="flex-1">
                <Text className="text-purple-600 font-semibold text-sm mb-1">
                  Секрет
                </Text>
                <Text className="text-gray-700 text-sm leading-5">
                  В Навате есть секретное меню для местных — спроси официанта
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdvicedCard;
