import type { RouteEntity } from "@/src/features/route/model/route.type";
import { RouteOptionsMenu } from "@/src/features/route/ui/RouteOptionsMenu";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { ChevronLeft, Clock, DollarSign, User } from "lucide-react-native";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

type RouteDetailsHeaderProps = {
  route: RouteEntity;
  durationHours: number;
  onEdit: () => void;
};

export default function RouteDetailsHeader({
  route,
  durationHours,
  onEdit,
}: RouteDetailsHeaderProps) {
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
              <ChevronLeft color="#fff" size={24} />
            </Link>
          </TouchableOpacity>
          <View className="flex-row gap-3">
            <TouchableOpacity className="p-2">
              <RouteOptionsMenu id={route.id} onEdit={onEdit} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mx-5">
          <View className="bg-white/20 self-start px-3 py-1 rounded-full mb-2">
            <Text className="text-white text-xs font-medium">{route.status}</Text>
          </View>
          <Text className="text-white text-2xl font-bold mb-1">{route.name}</Text>
          <Text className="text-white/90 text-sm mb-4">{route.description}</Text>
          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center gap-1">
              <Clock color="#fff" size={16} />
              <Text className="text-white text-sm">{durationHours} h</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <DollarSign color="#fff" size={16} />
              <Text className="text-white text-sm">~{route.params.budget} som</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <User color="#fff" size={16} />
              <Text className="text-white text-sm">
                {route.params.transportation}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
}
