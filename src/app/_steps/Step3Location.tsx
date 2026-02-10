import type { FormData } from "@/src/features/route/model/createRoute.types";
import { OptionCard } from "@/src/features/route/ui/OptionCard";
import type { LucideIcon } from "lucide-react-native";
import {
  Building2,
  Landmark,
  MapPin,
  Mountain,
  Trees,
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type Option = {
  id: Exclude<FormData["location"], null>;
  label: string;
  icon: LucideIcon;
};

const locationOptions: Option[] = [
  { id: "bishkek", label: "Bishkek", icon: Building2 },
  { id: "issyk-kul", label: "Issyk-Kul", icon: Mountain },
  { id: "karakol", label: "Karakol", icon: Trees },
  { id: "osh", label: "Osh", icon: Landmark },
  { id: "naryn", label: "Naryn", icon: MapPin },
];

export default function Step3Location({
  form,
  update,
  onNext,
}: {
  form: FormData;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  onNext: () => void;
}) {
  const canProceed = !!form.location;

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-5 pt-5">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Where are we walking?
        </Text>
        <Text className="text-base text-gray-600 mb-8">Select region</Text>

        <View className="flex-row flex-wrap gap-3">
          {locationOptions.map((o) => (
            <OptionCard
              key={o.id}
              label={o.label}
              icon={o.icon}
              isSelected={form.location === o.id}
              onPress={() => update("location", o.id)}
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
