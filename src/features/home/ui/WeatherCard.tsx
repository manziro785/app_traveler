import { Cloud, CloudRain, Sun } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";
import { Skeleton } from "@/src/shared/ui/Skeleton";
import { ErrorState } from "@/src/shared/ui/ErrorState";
import { useGetWeatherQuery } from "../model/useHome";
import { detectWeatherCategory } from "../model/weatherIcon";

const WeatherCard = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const { data, isLoading, isError, refetch } = useGetWeatherQuery();
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotateAnim]);
  if (isLoading) {
    return (
      <View className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 mt-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Skeleton width={32} height={32} rounded="full" />
            <View className="ml-3">
              <Skeleton width={64} height={20} rounded="md" className="mb-2" />
              <Skeleton width={48} height={12} rounded="md" />
            </View>
          </View>
          <View className="flex-1 ml-5 items-end">
            <Skeleton width="80%" height={12} rounded="md" className="mb-2" />
            <Skeleton width="70%" height={12} rounded="md" />
          </View>
        </View>
      </View>
    );
  }
  if (isError) {
    return (
      <View className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 mt-5">
        <ErrorState
          title="Weather unavailable"
          description="Failed to load recommendations."
          actionLabel="Retry"
          onAction={refetch}
        />
      </View>
    );
  }

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const weatherText = [
    data?.weather?.description,
    data?.weather?.condition,
    data?.weather?.main,
    data?.weather?.summary,
    data?.description,
    data?.condition,
    data?.recommendations,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");

  const category = detectWeatherCategory(weatherText);

  const iconColor =
    category === "sunny"
      ? "#FFB800"
      : category === "cloudy"
        ? "#CBD5E1"
        : category === "precipitation"
          ? "#93C5FD"
          : "#FFB800";

  return (
    <>
      <View className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 mt-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            {category === "sunny" ? (
              <Animated.View style={{ transform: [{ rotate }] }}>
                <Sun size={32} color={iconColor} />
              </Animated.View>
            ) : category === "cloudy" ? (
              <Cloud size={32} color={iconColor} />
            ) : category === "precipitation" ? (
              <CloudRain size={32} color={iconColor} />
            ) : (
              <Sun size={32} color={iconColor} />
            )}
            <View className="ml-3">
              <Text className="text-white text-2xl font-bold">
                {data?.weather?.temp ?? "--"}°C
              </Text>
              <Text className="text-white/80 text-sm">Bishkek</Text>
            </View>
          </View>
          <View className="flex-1 ml-5">
            <Text className="text-white/90 text-sm text-right">
              {data?.recommendations ?? ""}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default WeatherCard;
