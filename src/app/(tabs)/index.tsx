import AdvicedCard from "@/src/features/components/home/AdvicedCard";
import CurrentRouteCard from "@/src/features/components/home/CurrentRouteCard";
import WeatherCard from "@/src/features/components/home/WeatherCard";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Bot, LogOut, Plus } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <>
      <ScrollView
        className="flex-1 bg-[#F8FAFF]"
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={["#1F83EB", "#0FAFD5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View className="px-6 pt-16 pb-10">
            <View className="flex flex-row justify-between items-start">
              <View>
                <Text className="text-[#B6CEEF] text-xl">
                  Добро пожаловать,
                </Text>
                <Text className="text-4xl text-[#FFFF] font-bold">
                  Путешественник!
                </Text>
              </View>
              <View className="bg-white/20 p-3 rounded-2xl h-auto">
                <LogOut color="white" size={15} />
              </View>
            </View>
            <WeatherCard />
          </View>
        </LinearGradient>
        <View className="px-10">
          <View className="flex-row gap-3 mb-6 -mt-6">
            <Link href="/createRoute" asChild>
              <TouchableOpacity className="flex-1 bg-white rounded-3xl p-5 shadow-lg">
                <View className="w-12 h-12 rounded-2xl items-center justify-center mb-3 overflow-hidden">
                  <LinearGradient
                    colors={["#286BF7", "#06C8C8"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 12,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Plus color="white" size={24} strokeWidth={3} />
                  </LinearGradient>
                </View>
                <Text className="text-gray-900 font-bold text-base mb-1">
                  Создать маршрут
                </Text>
                <Text className="text-gray-500 text-sm">
                  AI подберет идеальный план
                </Text>
              </TouchableOpacity>
            </Link>

            <Link href="/chat" asChild>
              <TouchableOpacity className="flex-1 bg-white rounded-3xl p-5 shadow-lg">
                <View className="w-12 h-12 bg-orange-500 rounded-2xl items-center justify-center mb-3">
                  <LinearGradient
                    colors={["#FF7A56", "#FFAC11"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 12,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Bot color="white" size={24} />
                  </LinearGradient>
                </View>
                <Text className="text-gray-900 font-bold text-base mb-1">
                  Спросить AI
                </Text>
                <Text className="text-gray-500 text-sm">Быстрые ответы</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <CurrentRouteCard />
          <AdvicedCard />
          <View className="flex-row justify-between gap-3 mb-5">
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
        </View>
      </ScrollView>
    </>
  );
}
