import type { FormData } from "@/src/features/route/model/createRoute.types";
import { OptionCard } from "@/src/features/route/ui/OptionCard";
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

type Option<T extends string> = { id: T; label: string; icon: LucideIcon };
type CompanionsId = Exclude<FormData["companions"], null>;
type TransportationId = Exclude<FormData["transportation"], null>;

const companionsOptions: Option<CompanionsId>[] = [
  { id: "alone", label: "Alone", icon: User },
  { id: "couple", label: "Couple", icon: Users },
  { id: "family", label: "Family", icon: UsersRound },
  { id: "company", label: "Company", icon: Coffee },
];

const transportOptions: Option<TransportationId>[] = [
  { id: "walking", label: "Walking", icon: User },
  { id: "car", label: "Car", icon: Car },
  { id: "taxi", label: "Taxi", icon: CarTaxiFront },
  { id: "public", label: "Public tr.", icon: Bus },
];

export default function Step1WhoAndHow({
  form,
  update,
  onNext,
}: {
  form: FormData;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  onNext: () => void;
}) {
  const canProceed = !!form.companions && !!form.transportation;

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
            {companionsOptions.map((o) => (
              <OptionCard
                key={o.id}
                label={o.label}
                icon={o.icon}
                isSelected={form.companions === o.id}
                onPress={() => update("companions", o.id)}
              />
            ))}
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-base font-semibold text-gray-900 mb-4">
            How to get around?
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {transportOptions.map((o) => (
              <OptionCard
                key={o.id}
                label={o.label}
                icon={o.icon}
                isSelected={form.transportation === o.id}
                onPress={() => update("transportation", o.id)}
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
