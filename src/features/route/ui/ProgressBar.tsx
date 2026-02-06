import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ChevronLeft, House } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProgressBar({
  currentStep,
  totalSteps,
  onBack,
}: {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}) {
  const router = useRouter();
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View className="flex-row items-center px-4 py-3 bg-white h-20 mt-12">
      <TouchableOpacity onPress={onBack} className="p-2">
        <ChevronLeft size={24} color="#333" />
      </TouchableOpacity>

      <View className="flex-1 mx-4">
        <Text className="text-sm font-bold text-blue-600 mb-2 text-left">
          Step {currentStep} from {totalSteps}
        </Text>

        <View className="h-1.5 bg-gray-300 rounded-full overflow-hidden">
          <LinearGradient
            colors={["#286BF7", "#06C8C8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: `${progress}%`, height: 10, borderRadius: 999 }}
          />
        </View>
      </View>

      <TouchableOpacity className="p-2" onPress={() => router.push("/(tabs)")}>
        <House size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
}
