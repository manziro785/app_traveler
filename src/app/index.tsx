import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Mountain } from "lucide-react-native";
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
        <View className="flex-1 justify-between  px-6 py-8">
          <View className="mt-40">
            <View className="items-center">
              <View className="w-24 h-24 bg-white rounded-3xl items-center justify-center mb-6 shadow-lg">
                <Mountain color="#2563EB" size={48} strokeWidth={2.2} />
              </View>
              <Text className="text-gray-100 text-4xl font-semibold mb-2">
                Trip AI
              </Text>

              <Text className="text-white/70 text-base text-center px-4 ">
                Твой личный гид по Кыргызстану
              </Text>
            </View>

            <View className="px-12 mt-12">
              <View className="space-y-3">
                <TouchableOpacity
                  className="bg-white rounded-2xl py-4 px-3 items-center justify-center shadow-lg mb-3"
                  onPress={() => router.push("/login")}
                >
                  <View className="flex-row items-center">
                    <Text className="text-blue-600 font-bold text-center text-base ml-2">
                      Войти
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-white/20 border-2 border-white/40 rounded-2xl py-4 px-6 items-center"
                  onPress={() => router.push("/register")}
                >
                  <View className="flex-row items-center">
                    <Text className="text-white font-bold text-base ml-2">
                      Создать аккаунт
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="items-center pb-4">
            <Text className="text-white/60 text-xs mt-4">
              AI, который знает тебя
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
