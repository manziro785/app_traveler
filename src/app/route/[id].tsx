import { LinearGradient } from "expo-linear-gradient";
import { Link, useLocalSearchParams } from "expo-router";
import {
  ChevronLeft,
  Clock,
  Coffee,
  DollarSign,
  Heart,
  Lightbulb,
  Map,
  MessageCircle,
  MoreVertical,
  Navigation,
  Users,
  Volume2,
} from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Reel = () => {
  const { id } = useLocalSearchParams();
  const itineraryItems = [
    {
      id: 1,
      time: "10:00 - 11:00",
      title: "Sierra Coffee",
      description: "Лучший кофе в городе с уютной атмосферой",
      duration: "60 мин",
      icon: "coffee",
      color: "bg-red-400",
      tags: [{ icon: "map-pin", text: "Попробуй flat white" }],
    },
    {
      id: 2,
      time: "11:15 - 12:00",
      title: "Исторический музей",
      subtitle: "🕐 15 минут пешком от кофейни",
      description: "Краткая история Кыргызстана за один час",
      duration: "60 мин",
      icon: "museum",
      color: "bg-purple-500",
      tags: [
        { icon: "lightbulb", text: "Аудиогид включен" },
        { icon: "volume", text: "Аудиогид", link: true },
      ],
    },
    {
      id: 3,
      time: "12:15 - 13:00",
      title: "Дубовый парк",
      subtitle: "🚶 Не путь к обьду",
      duration: "45 мин",
      description: "Парк сквозной с юга на север",

      icon: "park",
      color: "bg-teal-400",
      tags: [{ icon: "lightbulb", text: "Возьми воду с собой" }],
    },
  ];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3b82f6" />
      <LinearGradient
        colors={["#1F83EB", "#0FAFD5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="p-2 py-14"
      >
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity className="p-2">
            <Link href="/(tabs)/route">
              <ChevronLeft color="#fff" size={24} />{" "}
            </Link>
          </TouchableOpacity>
          <View className="flex-row gap-3">
            <TouchableOpacity className="p-2">
              <Heart color="#fff" size={24} />
            </TouchableOpacity>
            <TouchableOpacity className="p-2">
              <MoreVertical color="#fff" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mx-5">
          <View className="bg-white/20 self-start px-3 py-1 rounded-full mb-2">
            <Text className="text-white text-xs font-medium">Черновик</Text>
          </View>
          <Text className="text-white text-2xl font-bold mb-1">
            Маршрут по osh
          </Text>
          <Text className="text-white/90 text-sm mb-4">
            AI-сгенерированный маршрут
          </Text>
          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center gap-1">
              <Clock color="#fff" size={16} />
              <Text className="text-white text-sm">8 ч</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <DollarSign color="#fff" size={16} />
              <Text className="text-white text-sm">~3000 сом</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Users color="#fff" size={16} />
              <Text className="text-white text-sm">5 км</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View className="bg-white mx-4 -mt-6 rounded-xl px-4 py-3 shadow-sm mb-4">
        <TouchableOpacity className="flex-row items-center justify-center gap-2">
          <MessageCircle color="#3b82f6" size={20} />
          <Text className="text-blue-600 font-medium">
            Спросить AI о маршруте
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="relative pb-24">
          {itineraryItems.map((item, index) => (
            <View key={item.id} className="flex-row mb-6">
              <View className="items-center mr-4">
                <View
                  className={`w-12 h-12 ${item.color} rounded-full items-center justify-center`}
                >
                  {item.icon === "coffee" && <Coffee color="#fff" size={24} />}
                  {item.icon === "museum" && (
                    <Text className="text-white text-2xl">🏛️</Text>
                  )}
                  {item.icon === "park" && (
                    <Text className="text-white text-2xl">🌳</Text>
                  )}
                </View>
                {index < itineraryItems.length - 1 && (
                  <View className="w-0.5 h-full bg-gray-300 absolute top-12" />
                )}
              </View>
              <View className="flex-1 bg-white rounded-xl p-4 shadow-sm">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="font-semibold text-gray-900">
                    {item.time}
                  </Text>
                  <Text className="text-xs text-gray-400">{item.duration}</Text>
                </View>

                {item.subtitle && (
                  <Text className="text-xs text-gray-500 mb-2">
                    {item.subtitle}
                  </Text>
                )}

                <Text className="text-base font-bold text-gray-900 mb-1">
                  {item.title}
                </Text>
                <Text className="text-sm text-gray-600 mb-6">
                  {item.description}
                </Text>
                {item.tags.map((tag, tagIndex) => (
                  <View key={tagIndex} className="mb-2">
                    {tag.link ? (
                      <TouchableOpacity className="flex-row gap-2 bg-blue-100 p-2 rounded-xl w-[35%]">
                        <Volume2 color="#3b82f6" size={16} />

                        <Text className="text-blue-600 text-sm font-medium">
                          {tag.text}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View className="flex-row items-center gap-2">
                        <Lightbulb color="#f59e0b" size={16} />
                        <Text className="text-gray-700 text-sm">
                          {tag.text}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 pb-10">
        <View className="flex-row gap-3">
          <Link href="/(tabs)/map" asChild className="flex-1">
            <TouchableOpacity className="bg-gray-100 py-3 rounded-xl flex-row items-center justify-center gap-2">
              <Map color="#374151" size={20} />
              <Text className="text-gray-900 font-semibold">На карте</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/(tabs)/map" asChild className="flex-1">
            <TouchableOpacity className="w-full bg-cyan-500 py-3 rounded-xl flex-row items-center justify-center gap-2">
              <Navigation color="#fff" size={20} />
              <Text className="text-white font-semibold">Начать</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </>
  );
};

export default Reel;
