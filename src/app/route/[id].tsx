import { useGetRouteById } from "@/src/features/route/model/useRoute";
import RouteDetailsHeader from "@/src/features/route/ui/RouteDetailsHeader";
import RouteDetailsSkeleton from "@/src/features/route/ui/RouteDetailsSkeleton";
import RoutePlaceTimelineItem, {
  fallbackPlaceIcon,
} from "@/src/features/route/ui/RoutePlaceTimelineItem";
import type { RoutePlace } from "@/src/features/route/model/route.type";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import {
  Camera,
  Coffee,
  Landmark,
  Map,
  MessageCircle,
  Music,
  Palmtree,
  ShoppingBag,
  Trees,
  UtensilsCrossed,
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ICONS = [
  Coffee,
  UtensilsCrossed,
  Camera,
  Landmark,
  Trees,
  ShoppingBag,
  Music,
  Palmtree,
];

const COLORS = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-indigo-500",
  "bg-yellow-500",
];

function buildPlaceStyles(places: RoutePlace[] = []) {
  return places.reduce(
    (acc, place, index) => {
      acc[place.placeId] = {
        icon: ICONS[index % ICONS.length],
        color: COLORS[index % COLORS.length],
      };
      return acc;
    },
    {} as Record<string, { icon: (typeof ICONS)[number]; color: string }>,
  );
}

const RouteDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const routeId = Array.isArray(id) ? id[0] : id;
  const { data, isLoading, isError, refetch } = useGetRouteById(routeId ?? "");

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const placeStyles = useMemo(() => buildPlaceStyles(data?.places), [data?.places]);
  const durationHours = data?.params.duration ? data.params.duration / 60 : 0;

  const toggleItem = (placeId: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [placeId]: !prev[placeId],
    }));
  };

  const handleEdit = () => {
    if (data?.id) router.push(`/editRoute/${data.id}`);
  };

  if (isLoading) {
    return <RouteDetailsSkeleton />;
  }

  if (isError || !data) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-xl font-bold text-gray-900 mb-2">
          Route unavailable
        </Text>
        <Text className="text-sm text-gray-500 text-center mb-6">
          Failed to load the route. Please try again.
        </Text>
        <TouchableOpacity
          onPress={() => refetch()}
          className="bg-blue-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <RouteDetailsHeader
        route={data}
        durationHours={durationHours}
        onEdit={handleEdit}
      />

      <Link href="/chat" asChild>
        <TouchableOpacity className="flex-row items-center justify-center gap-2 bg-white mx-4 -mt-6 rounded-xl px-4 py-3 shadow-sm mb-4">
          <MessageCircle color="#3b82f6" size={20} />
          <Text className="text-blue-600 font-medium">Ask AI for directions</Text>
        </TouchableOpacity>
      </Link>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="relative pb-24">
          {data.places.map((item, index) => {
            const style = placeStyles[item.placeId];
            const IconComponent = style?.icon || fallbackPlaceIcon;
            const colorClass = style?.color || "bg-red-500";

            return (
              <RoutePlaceTimelineItem
                key={item.placeId}
                item={item}
                isLast={index === data.places.length - 1}
                expanded={Boolean(expandedItems[item.placeId])}
                icon={IconComponent}
                colorClass={colorClass}
                onToggle={() => toggleItem(item.placeId)}
              />
            );
          })}
        </View>
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3"
        style={{ paddingBottom: Math.max(insets.bottom, 12) }}
      >
        <View className="flex-row gap-3">
          <Link href="/(tabs)/map" asChild className="flex-1">
            <TouchableOpacity className="bg-gray-100 py-3 rounded-xl flex-row items-center justify-center gap-2">
              <Map color="#374151" size={20} />
              <Text className="text-gray-900 font-semibold">On map</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </>
  );
};

export default RouteDetailsScreen;
