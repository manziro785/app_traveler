import { OptionCard } from "@/src/features/route/ui/OptionCard";
import type { FormData } from "@/src/features/route/model/createRoute.types";
import { Option, StepProps } from "@/src/shared/types";
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

const companionsOptions: Option<NonNullable<FormData["companions"]>>[] = [
  { id: "alone", label: "Alone", icon: User },
  { id: "couple", label: "Couple", icon: Users },
  { id: "family", label: "Family", icon: UsersRound },
  { id: "company", label: "Company", icon: Coffee },
];

const transportOptions: Option<NonNullable<FormData["transportation"]>>[] = [
  { id: "walking", label: "Walking", icon: User },
  { id: "car", label: "Car", icon: Car },
  { id: "taxi", label: "Taxi", icon: CarTaxiFront },
  { id: "public", label: "Public tr.", icon: Bus },
];

export default function Step1WhoAndHow({ form, update, onNext }: StepProps) {
  const canProceed = Boolean(form.companions && form.transportation);

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-5 pt-5">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          With whom and how?
        </Text>
        <Text className="text-base text-gray-600 mb-8">
          This influences the choice of locations
        </Text>

        <View className="mb-8">
          <Text className="text-base font-semibold text-gray-900 mb-4">
            Who are you traveling with?
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {companionsOptions.map((option) => (
              <OptionCard
                key={option.id}
                label={option.label}
                icon={option.icon}
                isSelected={form.companions === option.id}
                onPress={() => update("companions", option.id)}
              />
            ))}
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-base font-semibold text-gray-900 mb-4">
            How to get around?
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {transportOptions.map((option) => (
              <OptionCard
                key={option.id}
                label={option.label}
                icon={option.icon}
                isSelected={form.transportation === option.id}
                onPress={() => update("transportation", option.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="p-5">
        <TouchableOpacity
          className="py-4 rounded-xl items-center"
          disabled={!canProceed}
          onPress={onNext}
          activeOpacity={0.85}
          style={{ backgroundColor: canProceed ? "#4A90E2" : "#D1D5DB" }}
        >
          <Text className="text-white text-base font-semibold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
