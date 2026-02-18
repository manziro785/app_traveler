import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Clock, MapPin, Users } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import type { RouteEntity } from "../model/route.type";
import { RouteOptionsMenu } from "./RouteOptionsMenu";

const RouteCard = ({ route }: { route: RouteEntity }) => {
  const router = useRouter();
  const price = route.params.duration / 60;
  const isCompleted =
    route.status === "Завершен" || route.status === "Completed";
  const statusLabel = isCompleted ? "Completed" : route.status;

  const handleEdit = () => {
    console.log("Editing route:", route.id);
    router.push(`/editRoute/${route.id}`);
  };

  return (
    <TouchableOpacity onPress={() => router.push(`/route/${route.id}`)}>
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
        </View>
        <View className="w-full pl-4 pr-8">
          <View className="flex-row items-start justify-between mb-3">
            <View className="flex-row items-start gap-3 flex-1">
              <View className="flex-1 ">
                <Text className="font-semibold text-gray-900 mb-1">
                  {route.name}
                </Text>
                <Text className="text-sm text-gray-500">
                  {route.params.location}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-2">
              <View
                className={`px-2 py-1 rounded ${
                  isCompleted ? "bg-blue-50" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`text-xs ${
                    isCompleted ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {statusLabel}
                </Text>
              </View>
              <RouteOptionsMenu id={route.id} onEdit={handleEdit} />
            </View>
          </View>
          <View className="flex-row items-center gap-4 mb-2">
            <View className="flex-row items-center gap-1">
              <Clock color="#666" size={16} />
              <Text className="text-sm text-gray-600">{price}h.</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Users color="#666" size={16} />
              <Text className="text-sm text-gray-600">
                {route.params.companions}
              </Text>
            </View>
            <Text className="text-sm font-semibold text-gray-900">
              ≈{route.params.budget}
            </Text>
          </View>
          <Text className="text-xs text-gray-500">{route.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RouteCard;
