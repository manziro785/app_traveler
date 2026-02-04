import type { LucideIcon } from "lucide-react-native";
import {
  Building2,
  Moon,
  Mountain,
  Palette,
  ShoppingBag,
  Utensils,
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface PreferenceOption {
  id: string;
  label: string;
  icon: LucideIcon;
  iconColor: string;
}

const preferenceOptions: PreferenceOption[] = [
  { id: "food", label: "Еда", icon: Utensils, iconColor: "#EF4444" },
  { id: "history", label: "История", icon: Building2, iconColor: "#8B5CF6" },
  { id: "nature", label: "Природа", icon: Mountain, iconColor: "#10B981" },
  { id: "shopping", label: "Шопинг", icon: ShoppingBag, iconColor: "#F59E0B" },
  { id: "art", label: "Искусство", icon: Palette, iconColor: "#EC4899" },
  { id: "nightlife", label: "Вечером", icon: Moon, iconColor: "#6366F1" },
];

interface StepProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
  onNext: () => void;
}

export default function Step5Preferences({
  formData,
  updateFormData,
  onNext,
}: StepProps) {
  const handleToggle = (preferenceId: string) => {
    const currentPreferences = formData.preferences || [];
    const isSelected = currentPreferences.includes(preferenceId);

    const newPreferences = isSelected
      ? currentPreferences.filter((id: string) => id !== preferenceId)
      : [...currentPreferences, preferenceId];

    updateFormData("preferences", newPreferences);
  };

  const canProceed = formData.preferences && formData.preferences.length > 0;

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-5 pt-5">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Что в настроении?
        </Text>
        <Text className="text-base text-gray-600 mb-8">
          Можно выбрать несколько
        </Text>

        <View className="flex-row flex-wrap gap-3">
          {preferenceOptions.map((option) => (
            <PreferenceCard
              key={option.id}
              option={option}
              isSelected={formData.preferences?.includes(option.id)}
              onPress={() => handleToggle(option.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View className="p-5">
        <TouchableOpacity
          className={`py-4 rounded-xl items-center ${
            canProceed ? "bg-blue-500" : "bg-gray-300"
          }`}
          onPress={onNext}
          disabled={!canProceed}
          style={{
            backgroundColor: canProceed ? "#4A90E2" : "#D1D5DB",
          }}
        >
          <Text className="text-white text-base font-semibold">Далее</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface PreferenceCardProps {
  option: PreferenceOption;
  isSelected: boolean;
  onPress: () => void;
}

function PreferenceCard({ option, isSelected, onPress }: PreferenceCardProps) {
  const Icon = option.icon;

  return (
    <TouchableOpacity
      className="bg-white rounded-2xl p-4 items-center border-2 "
      style={{
        width: "47%",
        borderColor: isSelected ? "#2E5BFF" : "#E5E7EB",
        backgroundColor: isSelected ? "#F0F7FF" : "#fff",
      }}
      onPress={onPress}
    >
      <View
        className="w-16 h-16 rounded-full items-center justify-center mb-3"
        style={{
          backgroundColor: isSelected ? option.iconColor + "20" : "#F3F4F6",
        }}
      >
        <Icon size={32} color={isSelected ? option.iconColor : "#9CA3AF"} />
      </View>

      <Text
        className={`text-base font-semibold ${
          isSelected ? "text-blue-500" : "text-gray-900"
        }`}
      >
        {option.label}
      </Text>

      {isSelected && (
        <View className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-500 items-center justify-center">
          <Text className="text-white text-xs">✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
