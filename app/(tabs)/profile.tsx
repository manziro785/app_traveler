import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft, Edit3, Plus, User, X } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFF]">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#2563EB", "#06B6D4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="px-6 pt-4 pb-24"
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

          <View className="items-center  flex-row">
            <View className="w-20 h-20 bg-white rounded-3xl items-center justify-center mb-3">
              <User color="#2563EB" size={40} strokeWidth={2} />
            </View>
            <View className="ml-5">
              <Text className="text-white text-2xl font-bold mb-1">
                Путешественник
              </Text>
              <Text className="text-white/80 text-sm">
                AI знает тебя лучше, чем ты думаешь
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View className="mx-8">
          <View className="flex-row -mt-16 justify-between gap-3 mb-5">
            <View className="flex-1 bg-white rounded-2xl p-4 items-center shadow-lg">
              <Text className="text-blue-500 text-2xl font-bold mb-1">12</Text>
              <Text className="text-gray-500 text-xs">Мест</Text>
            </View>
            <View className="flex-1 bg-white rounded-2xl p-4 items-center shadow-lg">
              <Text className="text-green-500 text-2xl font-bold mb-1">5</Text>
              <Text className="text-gray-500 text-xs">Маршрутов</Text>
            </View>
            <View className="flex-1 bg-white rounded-2xl p-4 items-center shadow-lg">
              <Text className="text-blue-500 text-2xl font-bold mb-1">3</Text>
              <Text className="text-gray-500 text-xs">Завершено</Text>
            </View>
          </View>

          <View className="mb-4">
            <View className="bg-white rounded-3xl p-5 shadow-sm">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-gray-900 font-bold text-lg">
                  О себе (для AI)
                </Text>
                <TouchableOpacity>
                  <Text className="text-blue-500 text-sm">Редактирование</Text>
                </TouchableOpacity>
              </View>

              <View className="space-y-3">
                <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
                  <View className="flex-row items-center flex-1">
                    <Text className="text-base mr-2">❤️</Text>
                    <Text className="text-gray-700 flex-1">
                      Люблю: горы, кофе, закаты
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <X color="#EF4444" size={18} />
                  </TouchableOpacity>
                </View>

                <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
                  <View className="flex-row items-center flex-1">
                    <Text className="text-base mr-2">🚫</Text>
                    <Text className="text-gray-700 flex-1">
                      Не люблю: толпы, очереди
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <X color="#EF4444" size={18} />
                  </TouchableOpacity>
                </View>

                <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
                  <View className="flex-row items-center flex-1">
                    <Text className="text-base mr-2">🎉</Text>
                    <Text className="text-gray-700 flex-1">
                      Сладость: сладкое, лаваш
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <X color="#EF4444" size={18} />
                  </TouchableOpacity>
                </View>

                <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
                  <View className="flex-row items-center flex-1">
                    <Text className="text-gray-700 flex-1">люблю кофе</Text>
                  </View>
                  <TouchableOpacity>
                    <X color="#EF4444" size={18} />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="flex-row items-center mt-4 bg-gray-50 rounded-2xl px-4 py-1">
                <TextInput
                  placeholder="Добавить... (например: люблю кофе)"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 text-gray-700 text-base "
                />
                <TouchableOpacity className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center ml-2">
                  <Plus color="white" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="mb-4">
            <View className="bg-white rounded-3xl p-5 shadow-sm">
              <Text className="text-gray-900 font-bold text-lg mb-4">
                🎯 Предпочтения
              </Text>

              <View className="mb-4">
                <Text className="text-gray-600 text-sm mb-3">
                  Любимые категории
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  <View className="bg-green-50 px-4 py-2 rounded-full flex-row items-center">
                    <Text className="mr-1">🏞️</Text>
                    <Text className="text-green-600 font-medium text-sm">
                      Природа
                    </Text>
                  </View>
                  <View className="bg-red-50 px-4 py-2 rounded-full flex-row items-center">
                    <Text className="mr-1">🍔</Text>
                    <Text className="text-red-600 font-medium text-sm">
                      Еда
                    </Text>
                  </View>
                  <View className="bg-blue-50 px-4 py-2 rounded-full flex-row items-center">
                    <Text className="mr-1">🏛️</Text>
                    <Text className="text-blue-600 font-medium text-sm">
                      История
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Text className="text-gray-600 text-sm mb-2">Бюджет</Text>
                  <View className="bg-gray-50 px-4 py-3 rounded-xl">
                    <Text className="text-gray-700 font-medium">
                      💰 Средний
                    </Text>
                  </View>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-600 text-sm mb-2">Стиль</Text>
                  <View className="bg-gray-50 px-4 py-3 rounded-xl">
                    <Text className="text-gray-700 font-medium">👫 Пара</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View className=" mb-4">
            <View className="bg-white rounded-3xl p-5 shadow-sm">
              <Text className="text-gray-900 font-bold text-lg mb-4">
                Хочу посетить
              </Text>
              <View className="flex-row flex-wrap gap-2">
                <View className="bg-gray-100 px-4 py-2 rounded-full">
                  <Text className="text-gray-700 font-medium text-sm">
                    son-kul
                  </Text>
                </View>
                <View className="bg-gray-100 px-4 py-2 rounded-full">
                  <Text className="text-gray-700 font-medium text-sm">
                    karakol
                  </Text>
                </View>
                <View className="bg-gray-100 px-4 py-2 rounded-full">
                  <Text className="text-gray-700 font-medium text-sm">
                    tash-rabat
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <View className="px-6 mb-6">
            <TouchableOpacity className="bg-red-50 rounded-2xl py-4 items-center">
              <Text className="text-red-500 font-bold text-base">
                Выйти из аккаунта
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Padding */}
          <View className="h-6" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
