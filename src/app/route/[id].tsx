import { useGetRouteById } from "@/src/features/route/model/useRoute";
import { RouteOptionsMenu } from "@/src/features/route/ui/RouteOptionsMenu";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import {
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Clock,
  Coffee,
  DollarSign,
  Landmark,
  Lightbulb,
  Map,
  MessageCircle,
  Music,
  Palmtree,
  ShoppingBag,
  Trees,
  User,
  UtensilsCrossed,
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Skeleton } from "@/src/shared/ui/Skeleton";

const Reel = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const routeId = Array.isArray(id) ? id[0] : id;
  const { data, isLoading, isError, refetch } = useGetRouteById(
    routeId ?? "",
  );
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const icons = [
    Coffee,
    UtensilsCrossed,
    Camera,
    Landmark,
    Trees,
    ShoppingBag,
    Music,
    Palmtree,
  ];

  const colors = [
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

  const placeStyles = useMemo(() => {
    if (!data?.places) return {};

    return data.places.reduce((acc, place) => {
      acc[place.placeId] = {
        icon: icons[Math.floor(Math.random() * icons.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      return acc;
    }, {} as Record<string, { icon: (typeof icons)[number]; color: string }>);
  }, [data?.places]);

  if (isLoading) {
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
            <View className="p-2">
              <ChevronLeft color="#fff" size={24} />
            </View>
            <View className="flex-row gap-3">
              <View className="p-2">
                <Skeleton width={18} height={18} rounded="md" />
              </View>
            </View>
          </View>
          <View className="mx-5">
            <View className="bg-white/20 self-start px-3 py-1 rounded-full mb-2">
              <Skeleton width={60} height={10} rounded="md" />
            </View>
            <Skeleton width="70%" height={22} rounded="md" className="mb-2" />
            <Skeleton width="90%" height={12} rounded="md" className="mb-4" />
            <View className="flex-row items-center gap-4">
              <Skeleton width={70} height={12} rounded="md" />
              <Skeleton width={90} height={12} rounded="md" />
              <Skeleton width={80} height={12} rounded="md" />
            </View>
          </View>
        </LinearGradient>
        <View className="flex-row items-center justify-center gap-2 bg-white mx-4 -mt-6 rounded-xl px-4 py-3 shadow-sm mb-4">
          <Skeleton width={160} height={14} rounded="md" />
        </View>
        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
          <View className="relative pb-24">
            {[1, 2, 3].map((i) => (
              <View key={i} className="flex-row mb-6">
                <View className="items-center mr-4">
                  <View className="w-12 h-12 bg-gray-200 rounded-3xl" />
                  {i < 3 && <View className="w-0.5 h-full bg-gray-200 absolute top-12" />}
                </View>
                <View className="flex-1 bg-white rounded-xl p-4 shadow-sm">
                  <Skeleton width="70%" height={14} rounded="md" className="mb-2" />
                  <Skeleton width="90%" height={12} rounded="md" className="mb-3" />
                  <Skeleton width="60%" height={12} rounded="md" />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </>
    );
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

  console.log(data);

  const time = data?.params.duration ? data.params.duration / 60 : 0;

  const toggleItem = (placeId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [placeId]: !prev[placeId],
    }));
  };

  const handleEdit = () => {
    if (data?.id) router.push(`/editRoute/${data.id}`);
  };

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
              <RouteOptionsMenu id={data.id} onEdit={handleEdit} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mx-5">
          <View className="bg-white/20 self-start px-3 py-1 rounded-full mb-2">
            <Text className="text-white text-xs font-medium">
              {data.status}
            </Text>
          </View>
          <Text className="text-white text-2xl font-bold mb-1">
            {data.name}
          </Text>
          <Text className="text-white/90 text-sm mb-4">{data.description}</Text>
          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center gap-1">
              <Clock color="#fff" size={16} />
              <Text className="text-white text-sm">{time} h</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <DollarSign color="#fff" size={16} />
              <Text className="text-white text-sm">
                ~{data.params.budget} som
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <User color="#fff" size={16} />
              <Text className="text-white text-sm">
                {data.params.transportation}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <Link href="/chat" asChild>
        <TouchableOpacity className="flex-row items-center justify-center gap-2 bg-white mx-4 -mt-6 rounded-xl px-4 py-3 shadow-sm mb-4">
          <MessageCircle color="#3b82f6" size={20} />
          <Text className="text-blue-600 font-medium">
            Ask AI for directions
          </Text>
        </TouchableOpacity>
      </Link>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="relative pb-24">
          {data.places.map((item, index) => {
            const IconComponent = placeStyles[item.placeId]?.icon || Coffee;
            const colorClass = placeStyles[item.placeId]?.color || "bg-red-500";

            return (
              <View key={item.placeId} className="flex-row mb-6">
                <View className="items-center mr-4">
                  <View
                    className={`w-12 h-12 ${colorClass} rounded-3xl items-center justify-center`}
                  >
                    <IconComponent color="#fff" size={24} />
                  </View>
                  {index < data.places.length - 1 && (
                    <View className="w-0.5 h-full bg-gray-300 absolute top-12" />
                  )}
                </View>
                <View className="flex-1 bg-white rounded-xl p-4 shadow-sm">
                  <Text className="text-base font-bold text-gray-900 mb-1 ">
                    {item.name}
                  </Text>
                  <Text className="text-sm text-gray-600 mb-3">
                    {item.description}
                  </Text>

                  <View className="flex-row justify-between">
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="font-semibold text-gray-900"></Text>
                      <Text className="text-xs text-gray-400">
                        ± {item.startTime} - {item.endTime}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => toggleItem(item.placeId)}
                      className="flex-row items-center gap-1 mb-2 justify-end"
                    >
                      {expandedItems[item.placeId] ? (
                        <ChevronDown color="#9ca3af" size={20} />
                      ) : (
                        <ChevronUp color="#9ca3af" size={20} />
                      )}

                      <Text className="text-sm text-gray-500">
                        {expandedItems[item.placeId] ? "close" : "show"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {expandedItems[item.placeId] && (
                    <View>
                      {item.photoSpot && (
                        <Text className="text-sm text-gray-500 mb-2">
                          {item.photoSpot}
                        </Text>
                      )}
                      <View className="flex-row rounded-xl items-start flex-1 py-2 px-3 bg-[#FFF3D2]">
                        <View className="w-10 h-10 items-center justify-center mr-3">
                          <Lightbulb color="#EAB308" size={20} />
                        </View>
                        <View className="flex-1">
                          <Text className="text-yellow-600 font-semibold text-sm mb-1">
                            {item.tips}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </View>
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

export default Reel;
