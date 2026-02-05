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

type Option = { id: string; label: string; icon: LucideIcon };

const companionsOptions: Option[] = [
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
            {companionsOptions.map((o) => (
              <OptionCard
                key={o.id}
                label={o.label}
                icon={o.icon}
                isSelected={form.companions === (o.id as any)}
                onPress={() => update("companions", o.id as any)}
              />
            ))}
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-base font-semibold text-gray-900 mb-4">
            Как передвигаться?
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {transportOptions.map((o) => (
              <OptionCard
                key={o.id}
                label={o.label}
                icon={o.icon}
                isSelected={form.transportation === (o.id as any)}
                onPress={() => update("transportation", o.id as any)}
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
          <Text className="text-white text-base font-semibold">Далее</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
