import type { FormData } from "@/src/features/route/model/createRoute.types";
import { OptionCard } from "@/src/features/route/ui/OptionCard";
import type { LucideIcon } from "lucide-react-native";
import { CalendarDays, Clock, Sun, Timer } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type Option = {
  id: FormData["timeAvailable"] extends infer T ? Exclude<T, null> : never;
  label: string;
  icon: LucideIcon;
};

const timeOptions: Option[] = [
  { id: "2-3hours", label: "2–3 hours", icon: Timer },
  { id: "half-day", label: "Half day", icon: Clock },
  { id: "fullday", label: "Full day", icon: Sun },
  { id: "weekend", label: "Weekend", icon: CalendarDays },
];

export default function Step2TimeAvailable({
  form,
  update,
  onNext,
}: {
  form: FormData;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  onNext: () => void;
}) {
  const canProceed = !!form.timeAvailable;

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-5 pt-5">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          How much time?
        </Text>
        <Text className="text-base text-gray-600 mb-8">
          We'll tailor a plan to suit your pace.
        </Text>

        <View className="flex-row flex-wrap gap-3">
          {timeOptions.map((o) => (
            <OptionCard
              key={o.id}
              label={o.label}
              icon={o.icon}
              isSelected={form.timeAvailable === o.id}
              onPress={() => update("timeAvailable", o.id)}
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
