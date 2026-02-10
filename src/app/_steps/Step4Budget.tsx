import type { FormData } from "@/src/features/route/model/createRoute.types";
import { OptionCard } from "@/src/features/route/ui/OptionCard";
import type { LucideIcon } from "lucide-react-native";
import {
  Coins,
  CreditCard,
  Infinity as InfinityIcon,
  Wallet,
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type Option = {
  id: Exclude<FormData["budget"], null>;
  label: string;
  icon: LucideIcon;
};

const budgetOptions: Option[] = [
  { id: "economy", label: "Economy (500)", icon: Coins },
  { id: "medium", label: "Medium (1500)", icon: Wallet },
  { id: "comfort", label: "Comfort (3000)", icon: CreditCard },
  { id: "unlimited", label: "Unlimited", icon: InfinityIcon },
];

export default function Step4Budget({
  form,
  update,
  onNext,
}: {
  form: FormData;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  onNext: () => void;
}) {
  const canProceed = !!form.budget;

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-5 pt-5">
        <Text className="text-3xl font-bold text-gray-900 mb-2">Budget</Text>
        <Text className="text-base text-gray-600 mb-8">Som for a walk</Text>

        <View className="flex-row flex-wrap gap-3">
          {budgetOptions.map((o) => (
            <OptionCard
              key={o.id}
              label={o.label}
              icon={o.icon}
              isSelected={form.budget === o.id}
              onPress={() => update("budget", o.id)}
            />
          ))}
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
