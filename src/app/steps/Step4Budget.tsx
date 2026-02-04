import type { LucideIcon } from "lucide-react-native";
import { Banknote, Palmtree, Plane, Sparkles } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface BudgetOption {
  id: string;
  label: string;
  subtitle: string;
  icon: LucideIcon;
  iconColor: string;
}

const budgetOptions: BudgetOption[] = [
  {
    id: "economy",
    label: "Эконом",
    subtitle: "~500 сом",
    icon: Banknote,
    iconColor: "#10B981",
  },
  {
    id: "medium",
    label: "Средний",
    subtitle: "~1500 сом",
    icon: Sparkles,
    iconColor: "#F59E0B",
  },
  {
    id: "comfort",
    label: "Комфорт",
    subtitle: "~3000 сом",
    icon: Palmtree,
    iconColor: "#8B5CF6",
  },
  {
    id: "unlimited",
    label: "Без лимита",
    subtitle: "Сколько нужно",
    icon: Plane,
    iconColor: "#EC4899",
  },
];

interface StepProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
  onNext: () => void;
}

export default function Step4Budget({
  formData,
  updateFormData,
  onNext,
}: StepProps) {
  const handleSelect = (budgetId: string) => {
    updateFormData("budget", budgetId);
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-5 pt-5">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Какой бюджет?
        </Text>
        <Text className="text-base text-gray-600 mb-8">
          AI построит маршрут в рамках бюджета
        </Text>

        <View className="gap-4">
          {budgetOptions.map((option) => (
            <BudgetCard
              key={option.id}
              option={option}
              isSelected={formData.budget === option.id}
              onPress={() => handleSelect(option.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View className="p-5">
        <TouchableOpacity
          className={`py-4 rounded-xl items-center ${
            formData.budget ? "bg-blue-500" : "bg-gray-300"
          }`}
          onPress={onNext}
          disabled={!formData.budget}
          style={{
            backgroundColor: formData.budget ? "#4A90E2" : "#D1D5DB",
          }}
        >
          <Text className="text-white text-base font-semibold">
            Создать маршрут
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface BudgetCardProps {
  option: BudgetOption;
  isSelected: boolean;
  onPress: () => void;
}

function BudgetCard({ option, isSelected, onPress }: BudgetCardProps) {
  const Icon = option.icon;

  return (
    <TouchableOpacity
      className="bg-white rounded-2xl p-4 flex-row items-center border-2 "
      style={{
        borderColor: isSelected ? "#2E5BFF" : "#E5E7EB",
        backgroundColor: isSelected ? "#EDF2FF" : "#FFFFFF",
      }}
      onPress={onPress}
    >
      <View
        className="w-12 h-12 rounded-full items-center justify-center mr-4"
        style={{
          backgroundColor: isSelected ? option.iconColor + "20" : "#F3F4F6",
        }}
      >
        <Icon size={24} color={isSelected ? option.iconColor : "#9CA3AF"} />
      </View>

      <View className="flex-1">
        <Text
          className={`text-lg font-semibold ${
            isSelected ? "text-blue-500" : "text-gray-900"
          }`}
        >
          {option.label}
        </Text>
        <Text className="text-sm text-gray-500 mt-0.5">{option.subtitle}</Text>
      </View>

      {isSelected && (
        <View className="w-6 h-6 rounded-full bg-blue-500 items-center justify-center">
          <Text className="text-white text-xs">✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
