import { useGetPlacesQuery } from "@/src/features/map/model/usePlaces";
import { Skeleton } from "@/src/shared/ui/Skeleton";
import { Link } from "expo-router";
import { ChevronLeft, MapPin, Star } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const Map = () => {
  const { data: places, isLoading, isError, refetch } = useGetPlacesQuery();
  const [selectedPlace, setSelectedPlace] = useState(null);

  const normalizedPlaces = useMemo(() => {
    return (places ?? []).filter((place) => {
      return (
        Number.isFinite(Number(place.lat)) && Number.isFinite(Number(place.lng))
      );
    });
  }, [places]);

  const initialRegion = useMemo(() => {
    const first = normalizedPlaces[0];
    return {
      latitude: Number(first?.lat) || 42.8746,
      longitude: Number(first?.lng) || 74.5698,
      latitudeDelta: 0.3,
      longitudeDelta: 0.3,
    };
  }, [normalizedPlaces]);

  const total = normalizedPlaces.length;
  const activePlace = selectedPlace ?? normalizedPlaces[0] ?? null;
  const activePhoto = activePlace?.photos?.[0];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="bg-white flex-row justify-between pb-3 px-4 border-b border-gray-200">
        <Link href="/(tabs)" asChild>
          <TouchableOpacity className="items-center">
            <ChevronLeft />
          </TouchableOpacity>
        </Link>
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-2xl font-bold text-gray-900 mr-4">Map</Text>
        </View>
        <View></View>
      </View>

      <View className="flex-1">
        <View className="flex-1">
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={initialRegion}
            showsMyLocationButton={false}
          >
            {normalizedPlaces.map((place) => (
              <Marker
                key={place.id}
                coordinate={{
                  latitude: Number(place.lat),
                  longitude: Number(place.lng),
                }}
                title={place.name}
                description={place.description ?? undefined}
                pinColor="#3B82F6"
                onPress={() => setSelectedPlace(place)}
              />
            ))}
          </MapView>
        </View>

        <View className="bg-white rounded-t-3xl shadow-2xl">
          <View className="px-4 pt-4 pb-2 border-b border-gray-200">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-bold text-gray-900">
                {activePlace ? activePlace.name : "Nearby places"}
              </Text>
              <Text className="text-sm text-gray-500">{total}</Text>
            </View>
          </View>

          <View className="px-4 py-3">
            {isLoading ? (
              <View className="flex-row">
                <Skeleton width={96} height={72} rounded="lg" />
                <View className="flex-1 ml-3">
                  <Skeleton
                    width="70%"
                    height={14}
                    rounded="md"
                    className="mb-2"
                  />
                  <Skeleton
                    width="90%"
                    height={12}
                    rounded="md"
                    className="mb-2"
                  />
                  <Skeleton width="50%" height={12} rounded="md" />
                </View>
              </View>
            ) : isError ? (
              <View className="py-6">
                <Text className="text-sm text-gray-600 mb-2">
                  Failed to load places
                </Text>
                <TouchableOpacity
                  onPress={() => refetch()}
                  className="bg-blue-500 px-4 py-2 rounded-lg self-start"
                >
                  <Text className="text-white font-semibold text-sm">
                    Retry
                  </Text>
                </TouchableOpacity>
              </View>
            ) : activePlace ? (
              <TouchableOpacity activeOpacity={0.85} className="flex-row">
                {activePhoto ? (
                  <Image
                    source={{ uri: activePhoto }}
                    className="w-24 h-18 rounded-xl"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-24 h-18 rounded-xl bg-gray-100 items-center justify-center">
                    <MapPin color="#9ca3af" size={20} />
                  </View>
                )}
                <View className="flex-1 ml-3">
                  <Text className="text-base font-semibold text-gray-900 mb-1">
                    {activePlace.name}
                  </Text>
                  {!!activePlace.address && (
                    <Text
                      className="text-sm text-gray-500 mb-1"
                      numberOfLines={1}
                    >
                      {activePlace.address}
                    </Text>
                  )}
                  {!!activePlace.description && (
                    <Text className="text-sm text-gray-600" numberOfLines={2}>
                      {activePlace.description}
                    </Text>
                  )}
                  {!!activePlace.rating && (
                    <View className="flex-row items-center gap-1 mt-1">
                      <Star size={12} color="#F59E0B" />
                      <Text className="text-xs text-gray-500">
                        {activePlace.rating}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ) : (
              <View className="py-6 items-center">
                <Text className="text-sm text-gray-500">No places nearby</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Map;
