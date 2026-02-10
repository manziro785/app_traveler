import { useGetWishlistQuery } from "@/src/features/profile/model/useProfile";
import { useRouter } from "expo-router";
import { Heart, MapPin } from "lucide-react-native";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Skeleton } from "@/src/shared/ui/Skeleton";
import type { Place } from "@/src/shared/model/place.type";
import type { WishlistItem } from "../model/profile.type";

const AiBlock = () => {
  const router = useRouter();
  const {
    data: wishlist,
    isLoading,
    isError,
    refetch,
  } = useGetWishlistQuery();

  return (
    <View className="mb-4">
      <View className="bg-white rounded-3xl p-5 shadow-sm">
        <View className=" pt-2">
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center">
              <Heart color="#ef4444" fill="#ef4444" size={16} />
              <Text className="text-gray-900 font-bold text-base ml-2">
                My Wishlist
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/explore")}>
              <Text className="text-blue-600 text-xs font-medium">See All</Text>
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {[1, 2, 3].map((i) => (
                  <View
                    key={i}
                    className="w-32 bg-gray-50 rounded-xl overflow-hidden"
                  >
                    <Skeleton width="100%" height={96} rounded="md" />
                    <View className="p-2">
                      <Skeleton width="80%" height={12} rounded="md" className="mb-2" />
                      <Skeleton width="60%" height={10} rounded="md" />
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          ) : isError ? (
            <View className="bg-gray-50 rounded-xl p-4 items-center">
              <Text className="text-gray-600 text-sm mb-2">
                Failed to load wishlist
              </Text>
              <TouchableOpacity
                onPress={() => refetch()}
                className="bg-blue-500 px-4 py-2 rounded-lg active:opacity-80"
              >
                <Text className="text-white text-sm font-semibold">Retry</Text>
              </TouchableOpacity>
            </View>
          ) : wishlist && wishlist.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {wishlist.slice(0, 5).map((item: WishlistItem) => {
                  const place = (item.place || item) as Place;
                  return (
                    <View
                      key={item.id}
                      className="w-32 bg-gray-50 rounded-xl overflow-hidden"
                    >
                      <Image
                        source={{
                          uri:
                            place.photos?.[0] ||
                            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150",
                        }}
                        className="w-full h-24"
                        resizeMode="cover"
                      />
                      <View className="p-2">
                        <Text
                          className="text-gray-900 font-semibold text-xs"
                          numberOfLines={1}
                        >
                          {place.name}
                        </Text>
                        {place.address && (
                          <View className="flex-row items-center gap-1 mt-1">
                            <MapPin color="#9ca3af" size={10} />
                            <Text
                              className="text-gray-500 text-xs"
                              numberOfLines={1}
                            >
                              {place.address}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          ) : (
            <View className="bg-gray-50 rounded-xl p-4 items-center">
              <Heart color="#d1d5db" size={32} />
              <Text className="text-gray-500 text-sm mt-2 text-center">
                No places in wishlist yet
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/explore")}
                className="mt-3 bg-blue-500 px-4 py-2 rounded-lg active:opacity-80"
              >
                <Text className="text-white text-sm font-semibold">
                  Explore Places
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default AiBlock;
