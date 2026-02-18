import type { EditRouteForm } from "@/src/features/route/model/editRouteForm.types";
import React from "react";
import { Text, TextInput, View } from "react-native";

type EditRouteParamsSectionProps = {
  formData: EditRouteForm;
  setParam: <K extends keyof EditRouteForm["params"]>(
    field: K,
    value: EditRouteForm["params"][K],
  ) => void;
};

export default function EditRouteParamsSection({
  formData,
  setParam,
}: EditRouteParamsSectionProps) {
  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      <Text className="text-lg font-bold text-gray-900 mb-4">Parameters</Text>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Location *</Text>
        <TextInput
          value={formData.params.location}
          onChangeText={(text) => setParam("location", text)}
          placeholder="Bishkek"
          className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base"
          placeholderTextColor="#9ca3af"
        />
      </View>

      <View className="flex-row gap-3 mb-4">
        <View className="flex-1">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Budget (som)
          </Text>
          <TextInput
            value={formData.params.budget}
            onChangeText={(text) => setParam("budget", text)}
            placeholder="1500"
            keyboardType="numeric"
            className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View className="flex-1">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Duration (min)
          </Text>
          <TextInput
            value={formData.params.duration}
            onChangeText={(text) => setParam("duration", text)}
            placeholder="180"
            keyboardType="numeric"
            className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base"
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Companions
        </Text>
        <TextInput
          value={formData.params.companions}
          onChangeText={(text) => setParam("companions", text)}
          placeholder="friends, solo, family"
          className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base"
          placeholderTextColor="#9ca3af"
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Transportation
        </Text>
        <TextInput
          value={formData.params.transportation}
          onChangeText={(text) => setParam("transportation", text)}
          placeholder="walking, car, public"
          className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base"
          placeholderTextColor="#9ca3af"
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Mode</Text>
        <TextInput
          value={formData.params.mode}
          onChangeText={(text) => setParam("mode", text)}
          placeholder="quick, detailed"
          className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base"
          placeholderTextColor="#9ca3af"
        />
      </View>

      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Mood (comma separated)
        </Text>
        <TextInput
          value={formData.params.mood.join(", ")}
          onChangeText={(text) =>
            setParam(
              "mood",
              text
                .split(",")
                .map((m) => m.trim())
                .filter(Boolean),
            )
          }
          placeholder="food, nature, shopping"
          className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base"
          placeholderTextColor="#9ca3af"
        />
      </View>
    </View>
  );
}
