import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  ChevronLeft,
  Clock,
  MapPin,
  MoreVertical,
  Users,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Route = () => {
  const [activeTab, setActiveTab] = useState("Все");

  const routes = [
    {
      id: 1,
      title: "Маршрут по оаh",
      location: "oah",
      duration: "8 ч",
      price: "3000 сом",
      participants: 1,
      description: "3 мес • Биш Сопка, Исторический музей, Дубовый парк",
      status: "Черновик",
    },
    {
      id: 2,
      title: "Иссык-Куль выходные",
      location: "Иссык-Куль",
      duration: "2 дн",
      price: "4500 сом",
      participants: 4,
      description: "5 мес • Новые Парк, Развлечения, Парки",
      status: "Черновик",
    },
    {
      id: 3,
      title: "Исторический тур",
      location: "Бишкек",
      duration: "6 ч",
      price: "2400 сом",
      participants: 8,
      description: "5 мес • Башня Бурана",
      status: "Завершен",
    },
  ];

  const tabs = ["Все", "Активные", "Черновики", "История"];

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View className="pt-14  items-center justify-between px-4 py-3 bg-white">
        <View className="flex-row justify-between w-full">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="p-1">
              <ChevronLeft color="#666" size={24} />
            </TouchableOpacity>
            <Text className="text-xl font-extrabold  text-gray-900">
              Мои маршруты
            </Text>
          </View>
          <TouchableOpacity className="bg-blue-600 px-4 py-1.5 rounded-full">
            <Text className="text-white text-sm  font-medium">+ Новый</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between gap-3  mt-5">
          <View className="flex-1 bg-[#F8FAFF] rounded-2xl p-4 items-center">
            <Text className="text-blue-500 text-2xl font-bold mb-1">12</Text>
            <Text className="text-gray-500 text-xs">Мест</Text>
          </View>
          <View className="flex-1 bg-[#F8FAFF] rounded-2xl p-4 items-center">
            <Text className="text-green-500 text-2xl font-bold mb-1">5</Text>
            <Text className="text-gray-500 text-xs">Маршрутов</Text>
          </View>
          <View className="flex-1 bg-[#F8FAFF] rounded-2xl p-4 items-center">
            <Text className="text-blue-500 text-2xl font-bold mb-1">3</Text>
            <Text className="text-gray-500 text-xs">Завершено</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="bg-white border-b border-gray-200 ">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-6 py-3"
            contentContainerStyle={{ gap: 8 }}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full ${
                  activeTab === tab ? "bg-blue-600" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    activeTab === tab ? "text-white" : "text-gray-700"
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View className="p-4 px-6 gap-3 pb-24">
          {routes.map((route) => (
            <View
              key={route.id}
              className="bg-white flex-row rounded-xl p-4 shadow-sm"
            >
              <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center">
                <LinearGradient
                  colors={["#286BF7", "#06C8C8"]}
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
                  <MapPin color="#fff" size={20} />
                </LinearGradient>
              </View>{" "}
              <View className="w-full pl-4 pr-8">
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-row items-start gap-3 flex-1">
                    <Link href={`/route/${route.id}`}>
                      <View className="flex-1 ">
                        <Text className="font-semibold text-gray-900 mb-1">
                          {route.title}
                        </Text>
                        <Text className="text-sm text-gray-500">
                          {route.location}
                        </Text>
                      </View>
                    </Link>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <View
                      className={`px-2 py-1 rounded ${
                        route.status === "Завершен"
                          ? "bg-blue-50"
                          : "bg-gray-100"
                      }`}
                    >
                      <Text
                        className={`text-xs ${
                          route.status === "Завершен"
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        {route.status}
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <MoreVertical color="#999" size={16} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="flex-row items-center gap-4 mb-2">
                  <View className="flex-row items-center gap-1">
                    <Clock color="#666" size={16} />
                    <Text className="text-sm text-gray-600">
                      {route.duration}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Users color="#666" size={16} />
                    <Text className="text-sm text-gray-600">
                      {route.participants}
                    </Text>
                  </View>
                  <Text className="text-sm font-semibold text-gray-900">
                    ≈{route.price}
                  </Text>
                </View>
                <Text className="text-xs text-gray-500">
                  {route.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Route;
