import { LinearGradient } from "expo-linear-gradient";
import { Bot } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <>
      <LinearGradient
        colors={["#1F83EB", "#0FAFD5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className=""
      >
        <View className="px-10 pt-16 pb-10">
          <View>
            <Text className="text-[#B6CEEF] text-xl">Добро пожаловать,</Text>
            <Text className="text-[#FFFF] text-4xl font-bold">
              Путешественник!
            </Text>
          </View>
          <View className="flex-row justify-between my-5">
            <View className="bg-white/20 p-3 rounded-2xl w-28">
              <Text className="text-[#BDDEF8] ">Посещено</Text>
              <Text className="text-3xl font-bold text-white">12</Text>
            </View>
            <View className="bg-white/20 p-3 rounded-2xl w-28">
              <Text className="text-[#BDDEF8] ">Маршрутов</Text>
              <Text className="text-3xl font-bold text-white">6</Text>
            </View>
            <View className="bg-white/20 p-3 rounded-2xl w-28">
              <Text className="text-[#BDDEF8] ">Дней</Text>
              <Text className="text-3xl font-bold text-white">18</Text>
            </View>
          </View>{" "}
        </View>
      </LinearGradient>
      <View className="bg-[#F8FAFF] px-5">
        <View className="mx-6 -mt-6 bg-white rounded-3xl p-5 shadow-xl">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center mb-5 ">
              <Text className="text-5xl mr-4">☀️</Text>
              <View>
                <Text className="text-gray-900 text-3xl font-bold">+28°C</Text>
                <Text className="text-gray-500 text-base -mt-1">Солнечно</Text>
              </View>
            </View>
          </View>
          <View className="mt-4 bg-cyan-50 rounded-2xl p-4 shadow-sm">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-blue-400 rounded-full items-center justify-center mr-3">
                <Bot />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-semibold text-base">
                  AI рекомендация
                </Text>
                <Text className="text-gray-600 text-sm mt-1">
                  Сегодня жарко! Добавил остановки в тени и кафе с
                  кондиционером.
                </Text>
              </View>
            </View>
          </View>
          <View className="flex-row mt-4 gap-3">
            <TouchableOpacity className="flex-1 bg-cyan-100 rounded-xl py-3 items-center">
              <Text className="text-cyan-600 font-semibold">
                Найти прохладу
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-gray-100 rounded-xl py-3 items-center">
              <Text className="text-gray-700 font-semibold">Изменить</Text>
            </TouchableOpacity>
          </View>
        </View>{" "}
      </View>
    </>
  );
}
