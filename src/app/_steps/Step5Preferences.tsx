import type { FormData } from "@/src/features/route/model/createRoute.types";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const moods = [
  { id: "food", label: "Еда" },
  { id: "history", label: "История" },
  { id: "nature", label: "Природа" },
  { id: "relaxation", label: "Релакс" },
  { id: "shopping", label: "Шоппинг" },
  { id: "photo", label: "Фото-места" },
];

function Pill({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="px-4 py-2 rounded-full border"
      style={{
        borderColor: selected ? "#2E5BFF" : "#E5E7EB",
        backgroundColor: selected ? "#EDF2FF" : "#FFFFFF",
      }}
    >
      <Text
        style={{ color: selected ? "#2E5BFF" : "#6B7280", fontWeight: "600" }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function Step5Preferences({
  form,
  update,
  onNext,
}: {
  form: FormData;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  onNext: () => void;
}) {
  const toggle = (id: string) => {
    const has = form.preferences.includes(id);
    update(
      "preferences",
      has
        ? form.preferences.filter((x) => x !== id)
        : [...form.preferences, id],
    );
  };

  const canProceed = true;

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-5 pt-5">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Настроение
        </Text>
        <Text className="text-base text-gray-600 mb-6">
          Выбери интересы (можно несколько)
        </Text>

        <View className="flex-row flex-wrap gap-3">
          {moods.map((m) => (
            <Pill
              key={m.id}
              label={m.label}
              selected={form.preferences.includes(m.id)}
              onPress={() => toggle(m.id)}
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
          <Text className="text-white text-base font-semibold">
            Создать маршрут
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
