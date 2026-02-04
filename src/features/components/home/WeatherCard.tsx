import { Sun } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";

const WeatherCard = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  return (
    <>
      <View className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 mt-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Animated.View style={{ transform: [{ rotate }] }}>
              <Sun size={32} color="#FFB800" />
            </Animated.View>
            <View className="ml-3">
              <Text className="text-white text-2xl font-bold">+24°C</Text>
              <Text className="text-white/80 text-sm">Бишкек</Text>
            </View>
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-white/90 text-xs text-right">
              Возьми с собой воду — сегодня жарко! И не забудь кепку :){" "}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default WeatherCard;
