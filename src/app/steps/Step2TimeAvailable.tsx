import type { LucideIcon } from "lucide-react-native";
import { CircleSlash2, Clock, Flame, Sun } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface TimeOption {
  id: string;
  label: string;
  icon: LucideIcon;
  iconColor: string;
}

const timeOptions: TimeOption[] = [
  { id: "2-3hours", label: "2-3 часа", icon: Clock, iconColor: "#4A90E2" },
  { id: "half-day", label: "Полдня", icon: CircleSlash2, iconColor: "#4A90E2" },

  { id: "fullday", label: "Целый день", icon: Sun, iconColor: "#F59E0B" },
  { id: "weekend", label: "Выходные", icon: Flame, iconColor: "#EF4444" },
];

interface StepProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
  onNext: () => void;
}

export default function Step2TimeAvailable({
  formData,
  updateFormData,
  onNext,
}: StepProps) {
  const handleSelect = (value: string) => {
    updateFormData("timeAvailable", value);
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-5 pt-5">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Сколько времени есть?
        </Text>
        <Text className="text-base text-gray-600 mb-8">
          AI подберёт оптимальный темп
        </Text>

        <View className="gap-4">
          {timeOptions.map((option) => (
            <TimeCard
              key={option.id}
              option={option}
              isSelected={formData.timeAvailable === option.id}
              onPress={() => handleSelect(option.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View className="p-5">
        <TouchableOpacity
          className={`py-4 rounded-xl items-center ${
            formData.timeAvailable ? "bg-blue-500" : "bg-gray-300"
          }`}
          onPress={onNext}
          disabled={!formData.timeAvailable}
          style={{
            backgroundColor: formData.timeAvailable ? "#4A90E2" : "#D1D5DB",
          }}
        >
          <Text className="text-white text-base font-semibold">Далее</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface TimeCardProps {
  option: TimeOption;
  isSelected: boolean;
  onPress: () => void;
}

function TimeCard({ option, isSelected, onPress }: TimeCardProps) {
  const Icon = option.icon;

  return (
    <TouchableOpacity
      className="bg-white  rounded-2xl p-2 flex-row items-center border-2 "
      style={{
        borderColor: isSelected ? "#2E5BFF" : "#E5E7EB",
        backgroundColor: isSelected ? "#EDF2FF" : "#FFFFFF",
      }}
      onPress={onPress}
    >
      <View
        className="w-14 h-14 rounded-full items-center justify-center mr-4"
        style={{
          backgroundColor: isSelected ? option.iconColor + "20" : "#F3F4F6",
        }}
      >
        <Icon size={28} color={isSelected ? option.iconColor : "#9CA3AF"} />
      </View>

      <View className="flex-1">
        <Text
          className={`text-lg font-semibold ${
            isSelected ? "text-blue-500" : "text-gray-900"
          }`}
        >
          {option.label}
        </Text>
      </View>

      {isSelected && (
        <View className="w-6 h-6 rounded-full bg-blue-500 items-center justify-center">
          <Text className="text-white text-xs">✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
