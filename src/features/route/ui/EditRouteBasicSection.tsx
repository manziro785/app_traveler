import type { EditRouteForm } from "@/src/features/route/model/editRouteForm.types";
import React from "react";
import { Text, TextInput, View } from "react-native";

type EditRouteBasicSectionProps = {
  formData: EditRouteForm;
  setField: <K extends keyof EditRouteForm>(field: K, value: EditRouteForm[K]) => void;
};

export default function EditRouteBasicSection({
  formData,
  setField,
}: EditRouteBasicSectionProps) {
  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      <Text className="text-lg font-bold text-gray-900 mb-4">
        Basic Information
      </Text>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Route Name *
        </Text>
        <TextInput
          value={formData.name}
          onChangeText={(text) => setField("name", text)}
          placeholder="Enter route name"
          className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base"
          placeholderTextColor="#9ca3af"
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Description *
        </Text>
        <TextInput
          value={formData.description}
          onChangeText={(text) => setField("description", text)}
          placeholder="Describe your route"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base min-h-[80px]"
          placeholderTextColor="#9ca3af"
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Status</Text>
        <TextInput
          value={formData.status}
          onChangeText={(text) => setField("status", text)}
          placeholder="SAVED, ACTIVE, COMPLETED"
          className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base"
          placeholderTextColor="#9ca3af"
        />
      </View>

      <View className="flex-row gap-3 mb-4">
        <View className="flex-1">
          <Text className="text-sm font-semibold text-gray-700 mb-2">Date</Text>
          <TextInput
            value={formData.scheduledDate}
            onChangeText={(text) => setField("scheduledDate", text)}
            placeholder="2026-02-09"
            className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View className="flex-1">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Start Time
          </Text>
          <TextInput
            value={formData.scheduledTime}
            onChangeText={(text) => setField("scheduledTime", text)}
            placeholder="10:00"
            className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base"
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-2">End Time</Text>
        <TextInput
          value={formData.endTime}
          onChangeText={(text) => setField("endTime", text)}
          placeholder="13:00"
          className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base"
          placeholderTextColor="#9ca3af"
        />
      </View>
    </View>
  );
}
