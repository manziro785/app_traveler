import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Compass, MapPin, Mountain } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#2563EB", "#06B6D4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-between px-6 py-8">
          <View className="items-center mt-28">
            <View className="w-24 h-24 bg-white rounded-3xl items-center justify-center mb-6 shadow-lg">
              <Mountain color="#2563EB" size={48} strokeWidth={2.5} />
            </View>
            <Text className="text-gray-200 text-xl font-medium mb-6">
              Trip <Text className="font-bold text-white">AI</Text>
            </Text>
            <Text className="text-white text-3xl font-bold mb-3 text-center">
              Привет! Куда планируешь?
            </Text>
            <Text className="text-white/80 text-base text-center px-4">
              Твой личный AI-гид по Кыргызстану
            </Text>

            <View className="flex-row items-center justify-center mb-6 gap-2 mt-5">
              <View className="flex-row items-center  bg-white/10 py-3 px-5 rounded-full">
                <MapPin color="white" size={14} />
                <Text className="text-white/80 text-xs ml-2">
                  Умные маршруты
                </Text>
              </View>
              <View className="flex-row items-center bg-white/10 py-3 px-5 rounded-full">
                <Compass color="white" size={14} />
                <Text className="text-white/80 text-xs ml-2">
                  Локальные инсайты
                </Text>
              </View>
            </View>
          </View>

          <View className="px-4">
            <View className="space-y-3">
              <TouchableOpacity
                className="bg-white rounded-2xl py-4 px-7 items-center justify-center shadow-lg mb-3"
                onPress={() => router.push("/(tabs)")}
              >
                <View className="flex-row items-center">
                  <MapPin color="#2563EB" size={20} />
                  <Text className="text-blue-600 font-bold text-center text-base ml-2">
                    Я сейчас в Бишкеке.
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-white/20 border-2 border-white/40 rounded-2xl py-4 px-6 items-center"
                onPress={() => router.push("/(tabs)")}
              >
                <View className="flex-row items-center">
                  <Compass color="white" size={20} />
                  <Text className="text-white font-bold text-base ml-2">
                    Планирую поездку
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View className="items-center pb-4">
            <View className="flex-row items-center">
              <TouchableOpacity className="bg-white/20 rounded-2xl px-6 py-3 mr-3">
                <Text className="text-white font-semibold text-sm">Войти</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white rounded-2xl px-6 py-3">
                <Text className="text-[#06B6D4] font-semibold text-sm">
                  Регистрация
                </Text>
              </TouchableOpacity>
            </View>
            <Text className="text-white/60 text-xs mt-4">
              AI, который знает тебя
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
