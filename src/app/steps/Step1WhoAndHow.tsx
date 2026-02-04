import type { LucideIcon } from "lucide-react-native";
import {
  Bus,
  Car,
  CarTaxiFront,
  Coffee,
  User,
  Users,
  UsersRound,
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Option {
  id: string;
  label: string;
  icon: LucideIcon;
}

const travelWithOptions: Option[] = [
  { id: "alone", label: "Один", icon: User },
  { id: "couple", label: "Пара", icon: Users },
  { id: "family", label: "Семья", icon: UsersRound },
  { id: "company", label: "Компания", icon: Coffee },
];

const transportOptions: Option[] = [
  { id: "walking", label: "Пешком", icon: User },
  { id: "car", label: "На машине", icon: Car },
  { id: "taxi", label: "Такси", icon: CarTaxiFront },
  { id: "public", label: "Общественный", icon: Bus },
];

interface StepProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
  onNext: () => void;
}

export default function Step1WhoAndHow({
  formData,
  updateFormData,
  onNext,
}: StepProps) {
  const handleSelect = (type: string, value: string) => {
    updateFormData(type, value);
  };

  const canProceed = formData.travelWith && formData.transportType;

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-5 pt-5">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          С кем и как?
        </Text>
        <Text className="text-base text-gray-600 mb-8">
          Это влияет на выбор мест
        </Text>

        <View className="mb-8">
          <Text className="text-base font-semibold text-gray-900 mb-4">
            С кем путешествуешь?
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {travelWithOptions.map((option) => (
              <OptionCard
                key={option.id}
                label={option.label}
                icon={option.icon}
                isSelected={formData.travelWith === option.id}
                onPress={() => handleSelect("travelWith", option.id)}
              />
            ))}
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-base font-semibold text-gray-900 mb-4">
            Как передвигаться?
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {transportOptions.map((option) => (
              <OptionCard
                key={option.id}
                label={option.label}
                icon={option.icon}
                isSelected={formData.transportType === option.id}
                onPress={() => handleSelect("transportType", option.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="p-5">
        <TouchableOpacity
          className={`py-4 rounded-xl items-center ${
            canProceed
              ? "bg-gradient-to-r from-blue-500 to-cyan-400"
              : "bg-gray-300"
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

interface OptionCardProps {
  label: string;
  icon: LucideIcon;
  isSelected: boolean;
  onPress: () => void;
}

function OptionCard({
  label,
  icon: Icon,
  isSelected,
  onPress,
}: OptionCardProps) {
  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-5 items-center border-2"
      style={{
        width: "47%",
        borderColor: isSelected ? "#2E5BFF" : "#E5E7EB",
        backgroundColor: isSelected ? "#EDF2FF" : "#FFFFFF",
      }}
      onPress={onPress}
    >
      <Icon size={32} color="#666" />
      <Text className="mt-2 text-sm font-medium" style={{ color: "#6B7280" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
