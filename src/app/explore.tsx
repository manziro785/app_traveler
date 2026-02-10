// app/explore.tsx
import {
  useGetPlacesQuery,
  useGetWishlistQuery,
  usePostWishlistMutation,
} from "@/src/features/profile/model/useProfile";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  Heart,
  MapPin,
  Search,
  Star,
  X,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

const Explore = () => {
  const router = useRouter();
  const { data: places, isLoading: placesLoading } = useGetPlacesQuery();
  const { data: wishlist, isLoading: wishlistLoading } = useGetWishlistQuery();
  const { mutateAsync, isPending } = usePostWishlistMutation();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const isInWishlist = (placeId: string) => {
    if (!wishlist) return false;
    return wishlist.some(
      (item: any) =>
        item.placeId === placeId ||
        item.id === placeId ||
        item.place?.id === placeId,
    );
  };

  const toggleWishlist = async (placeId: string) => {
    try {
      await mutateAsync({ placeId });
    } catch (error) {
      console.error("Wishlist error:", error);
    }
  };

  const filteredPlaces = places?.filter((place: any) => {
    const matchesSearch =
      place.name.toLowerCase().includes(search.toLowerCase()) ||
      place.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !selectedCategory || place.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories =
    places?.reduce((acc: string[], place: any) => {
      if (place.category?.name && !acc.includes(place.category.name)) {
        acc.push(place.category.name);
      }
      return acc;
    }, []) || [];

  if (placesLoading || wishlistLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient
        colors={["#1F83EB", "#0FAFD5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="pt-14 pb-6"
      >
        <View className="px-4">
          <View className="flex-row items-center justify-between mb-4">
            <Pressable
              onPress={() => router.back()}
              className="p-2 active:opacity-70"
            >
              <ChevronLeft color="#fff" size={24} />
            </Pressable>
            <Text className="text-white text-xl font-bold">Explore Places</Text>
            <View className="w-10" />
          </View>

          {/* Search Bar */}
          <View className="bg-white/20 backdrop-blur rounded-xl px-4 py-3 flex-row items-center">
            <Search color="#fff" size={20} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search places..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              className="flex-1 ml-2 text-white text-base"
            />
            {search !== "" && (
              <Pressable onPress={() => setSearch("")}>
                <X color="#fff" size={20} />
              </Pressable>
            )}
          </View>
        </View>
      </LinearGradient>

      {/* Categories */}
      {categories.length > 0 && (
        <View className="bg-white border-b border-gray-200 px-4 py-3">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={["All", ...categories]}
            keyExtractor={(item) => item}
            contentContainerStyle={{ gap: 8 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  setSelectedCategory(item === "All" ? null : item)
                }
                className={`px-4 py-2 rounded-full ${
                  (item === "All" && !selectedCategory) ||
                  selectedCategory === item
                    ? "bg-blue-500"
                    : "bg-gray-100"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    (item === "All" && !selectedCategory) ||
                    selectedCategory === item
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>
      )}

      {/* Stats */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <Text className="text-gray-600 text-sm">
          Found {filteredPlaces?.length || 0} places
          {wishlist && wishlist.length > 0 && (
            <Text className="text-blue-600 font-semibold">
              {" • "}
              {wishlist.length} in wishlist
            </Text>
          )}
        </Text>
      </View>

      {/* Places Grid */}
      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <MapPin color="#d1d5db" size={48} />
            <Text className="text-gray-500 text-base mt-4">
              No places found
            </Text>
            {search && (
              <Pressable
                onPress={() => setSearch("")}
                className="mt-2 bg-blue-500 px-4 py-2 rounded-lg"
              >
                <Text className="text-white font-medium">Clear search</Text>
              </Pressable>
            )}
          </View>
        }
        renderItem={({ item }) => {
          const inWishlist = isInWishlist(item.id);

          return (
            <View className="flex-1 bg-white rounded-2xl overflow-hidden shadow-sm mb-3">
              {/* Image */}
              <View className="relative">
                <Image
                  source={{
                    uri:
                      item.photos?.[0] ||
                      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
                  }}
                  className="w-full h-40"
                  resizeMode="cover"
                />

                {/* Wishlist Button */}
                <Pressable
                  onPress={() => toggleWishlist(item.id)}
                  disabled={isPending}
                  className={`absolute top-2 right-2 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg active:scale-95 ${
                    isPending ? "opacity-50" : ""
                  }`}
                >
                  <Heart
                    color={inWishlist ? "#ef4444" : "#9ca3af"}
                    fill={inWishlist ? "#ef4444" : "transparent"}
                    size={20}
                  />
                </Pressable>

                {/* Rating */}
                {item.rating && (
                  <View className="absolute bottom-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex-row items-center gap-1">
                    <Star color="#eab308" fill="#eab308" size={12} />
                    <Text className="text-gray-900 font-semibold text-xs">
                      {item.rating}
                    </Text>
                  </View>
                )}

                {/* Category Badge */}
                {item.category?.name && (
                  <View className="absolute top-2 left-2 bg-blue-500/90 backdrop-blur px-2 py-1 rounded-lg">
                    <Text className="text-white font-medium text-xs">
                      {item.category.name}
                    </Text>
                  </View>
                )}
              </View>

              {/* Info */}
              <View className="p-3">
                <Text
                  className="text-gray-900 font-bold text-sm mb-1"
                  numberOfLines={2}
                >
                  {item.name}
                </Text>

                {item.address && (
                  <View className="flex-row items-center gap-1 mb-2">
                    <MapPin color="#9ca3af" size={12} />
                    <Text
                      className="text-gray-500 text-xs flex-1"
                      numberOfLines={1}
                    >
                      {item.address}
                    </Text>
                  </View>
                )}

                {item.description && (
                  <Text
                    className="text-gray-600 text-xs leading-4"
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                )}

                {item.priceRange && (
                  <View className="mt-2 bg-gray-50 px-2 py-1 rounded self-start">
                    <Text className="text-gray-700 text-xs font-medium">
                      {item.priceRange}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Explore;
