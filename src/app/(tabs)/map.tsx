import {
  Building2,
  Clock,
  Filter,
  Mountain,
  ShoppingBag,
  Utensils,
} from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const categories = [
  { id: "all", label: "Все", icon: null },
  { id: "food", label: "Еда", icon: Utensils },
  { id: "history", label: "История", icon: Building2 },
  { id: "nature", label: "Природа", icon: Mountain },
  { id: "shopping", label: "Шопинг", icon: ShoppingBag },
];

const places = [
  {
    id: 1,
    name: "Sierra Coffee",
    category: "food",
    emoji: "🍽️",
    color: "#F59E0B",
    lat: 42.8746,
    lng: 74.5698,
    time: "60 мин",
    description: "Лучший кофе в городе с уютной атмо...",
    inRoute: true,
  },
  {
    id: 2,
    name: "Исторический музей",
    category: "history",
    emoji: "🏛️",
    color: "#8B5CF6",
    lat: 42.8756,
    lng: 74.6098,
    time: "60 мин",
    description: "Краткая история Кыргызстана за один...",
    inRoute: true,
    badge: 1,
  },
  {
    id: 3,
    name: "Парк",
    category: "nature",
    emoji: "🌲",
    color: "#10B981",
    lat: 42.8646,
    lng: 74.5898,
    time: "45 мин",
    description: "Прекрасное место для прогулок",
  },
  {
    id: 4,
    name: "Кафе",
    category: "food",
    emoji: "☕",
    color: "#06B6D4",
    lat: 42.8846,
    lng: 74.5998,
    time: "30 мин",
    description: "Уютное кафе в центре",
  },
  {
    id: 5,
    name: "Природа",
    category: "nature",
    emoji: "🌲",
    color: "#10B981",
    lat: 42.8546,
    lng: 74.5498,
    time: "90 мин",
    description: "Красивые виды",
  },
  {
    id: 6,
    name: "Природа 2",
    category: "nature",
    emoji: "🌲",
    color: "#06B6D4",
    lat: 42.8946,
    lng: 74.6298,
    time: "70 мин",
    description: "Отличное место",
  },
  {
    id: 7,
    name: "Природа 3",
    category: "nature",
    emoji: "🌲",
    color: "#06B6D4",
    lat: 42.8446,
    lng: 74.5298,
    time: "50 мин",
    description: "Зелёная зона",
  },
  {
    id: 8,
    name: "Ресторан",
    category: "food",
    emoji: "🍔",
    color: "#EF4444",
    lat: 42.8696,
    lng: 74.5798,
    time: "40 мин",
    description: "Вкусная еда",
  },
];

const Map = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPlaces =
    selectedCategory === "all"
      ? places
      : places.filter((p) => p.category === selectedCategory);

  const initialRegion = {
    latitude: 42.8746,
    longitude: 74.5698,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View className="flex-1 bg-white">
      <View className="bg-white pt-12 pb-3 px-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-2xl font-bold text-gray-900">Карта</Text>
            <Text className="text-sm text-gray-500">10 мест рядом</Text>
          </View>
          <TouchableOpacity className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center">
            <Filter size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row gap-2"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full flex-row items-center gap-2 ${
                  isSelected ? "bg-blue-500" : "bg-gray-100"
                }`}
              >
                {Icon && (
                  <Icon size={18} color={isSelected ? "#fff" : "#6B7280"} />
                )}
                <Text
                  className={`font-medium ${
                    isSelected ? "text-white" : "text-gray-700"
                  }`}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View className="flex-1">
        <View className="flex-1">
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={initialRegion}
            showsUserLocation
            showsMyLocationButton={false}
          >
            {filteredPlaces.map((place) => (
              <Marker
                key={place.id}
                coordinate={{ latitude: place.lat, longitude: place.lng }}
              >
                <View className="items-center">
                  <View
                    className="w-12 h-12 rounded-full items-center justify-center shadow-lg"
                    style={{ backgroundColor: place.color }}
                  >
                    <Text className="text-2xl">{place.emoji}</Text>
                  </View>
                  {place.badge && (
                    <View className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full items-center justify-center">
                      <Text className="text-white text-xs font-bold">
                        {place.badge}
                      </Text>
                    </View>
                  )}
                </View>
              </Marker>
            ))}

            <Marker coordinate={{ latitude: 42.8746, longitude: 74.5898 }}>
              <View className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow" />
            </Marker>
          </MapView>

          <TouchableOpacity className="absolute bottom-6 right-4 w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg">
            <View className="w-2 h-2 bg-blue-500 rounded-full" />
          </TouchableOpacity>
        </View>

        <View
          className="bg-white rounded-t-3xl shadow-2xl"
          style={{ maxHeight: 200 }}
        >
          <View className="px-4 pt-4 pb-2 border-b border-gray-200">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-bold text-gray-900">
                Места рядом
              </Text>
              <Text className="text-sm text-gray-500">10</Text>
            </View>
          </View>

          <ScrollView
            className="flex-1 px-4 py-2"
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              className="flex-row items-center bg-purple-50 rounded-2xl p-4 mb-3"
              activeOpacity={0.7}
            >
              <View className="w-12 h-12 bg-purple-100 rounded-xl items-center justify-center mr-3">
                <Text className="text-2xl">☕</Text>
              </View>
              <View className="flex-1">
                <View className="flex-row items-center gap-2 mb-1">
                  <Text className="text-base font-semibold text-gray-900">
                    Sierra Coffee
                  </Text>
                  <View className="px-2 py-0.5 bg-blue-500 rounded-full">
                    <Text className="text-white text-xs font-medium">
                      В маршруте
                    </Text>
                  </View>
                </View>
                <Text className="text-sm text-gray-500 mb-1" numberOfLines={1}>
                  Лучший кофе в городе с уютной атмо...
                </Text>
                <View className="flex-row items-center gap-1">
                  <Clock size={12} color="#9CA3AF" />
                  <Text className="text-xs text-gray-400">60 мин</Text>
                </View>
              </View>
              <TouchableOpacity className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center ml-2">
                <Mountain size={20} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center bg-white rounded-2xl p-4 border border-gray-200 mb-3"
              activeOpacity={0.7}
            >
              <View className="w-12 h-12 bg-purple-100 rounded-xl items-center justify-center mr-3">
                <Text className="text-2xl">🏛️</Text>
              </View>
              <View className="flex-1">
                <View className="flex-row items-center gap-2 mb-1">
                  <Text className="text-base font-semibold text-gray-900">
                    Исторический музей
                  </Text>
                  <View className="px-2 py-0.5 bg-blue-500 rounded-full">
                    <Text className="text-white text-xs font-medium">
                      В маршруте
                    </Text>
                  </View>
                </View>
                <Text className="text-sm text-gray-500 mb-1" numberOfLines={1}>
                  Краткая история Кыргызстана за один...
                </Text>
                <View className="flex-row items-center gap-1">
                  <Clock size={12} color="#9CA3AF" />
                  <Text className="text-xs text-gray-400">60 мин</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Map;
