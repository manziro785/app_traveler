import AdvicedCard from "@/src/features/home/ui/AdvicedCard";
import CurrentRouteCard from "@/src/features/home/ui/CurrentRouteCard";
import StatsCard from "@/src/features/home/ui/StatsCard";
import WeatherCard from "@/src/features/home/ui/WeatherCard";
import { useLogout } from "@/src/shared/model/logout";
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
                <Text className="text-[#B6CEEF] text-xl">Welcome,</Text>
                <Text className="text-4xl text-[#FFFF] font-bold">
                  Traveler!
                </Text>
              </View>

              <TouchableOpacity
                className="bg-white/20 p-3 rounded-2xl"
                onPress={useLogout}
                activeOpacity={0.8}
              >
                <LogOut color="white" size={15} />
              </TouchableOpacity>
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
                  Create route
                </Text>
                <Text className="text-gray-500 text-sm">
                  AI will select the ideal plan
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
                  Ask AI
                </Text>
                <Text className="text-gray-500 text-sm">Fast answers</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <CurrentRouteCard />
          <AdvicedCard />
          <StatsCard />
        </View>
      </ScrollView>
    </>
  );
}
