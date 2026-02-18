import type {
  EditRouteForm,
  EditablePlace,
} from "@/src/features/route/model/editRouteForm.types";
import { Plus, Trash2 } from "lucide-react-native";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

type EditRoutePlacesSectionProps = {
  formData: EditRouteForm;
  addNewPlace: () => void;
  movePlaceUp: (index: number) => void;
  movePlaceDown: (index: number) => void;
  removePlace: (index: number) => void;
  updatePlace: <K extends keyof EditablePlace>(
    index: number,
    field: K,
    value: EditablePlace[K],
  ) => void;
};

export default function EditRoutePlacesSection({
  formData,
  addNewPlace,
  movePlaceUp,
  movePlaceDown,
  removePlace,
  updatePlace,
}: EditRoutePlacesSectionProps) {
  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-bold text-gray-900">
          Places ({formData.places.length})
        </Text>
        <Pressable
          onPress={addNewPlace}
          className="flex-row items-center gap-1 bg-blue-50 px-3 py-2 rounded-lg active:opacity-70"
        >
          <Plus color="#3b82f6" size={18} />
          <Text className="text-blue-600 font-semibold text-sm">Add Place</Text>
        </Pressable>
      </View>

      {formData.places.map((place, index) => (
        <View
          key={place.placeId}
          className="mb-4 bg-gray-50 rounded-xl p-4 border border-gray-200"
        >
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <View className="bg-blue-100 px-2 py-1 rounded">
                <Text className="text-blue-600 font-bold text-xs">
                  #{index + 1}
                </Text>
              </View>
              <Text className="font-bold text-gray-900">{place.category}</Text>
            </View>

            <View className="flex-row items-center gap-2">
              {index > 0 && (
                <Pressable
                  onPress={() => movePlaceUp(index)}
                  className="p-2 bg-gray-200 rounded-lg active:opacity-70"
                >
                  <Text className="text-gray-700 font-bold">↑</Text>
                </Pressable>
              )}

              {index < formData.places.length - 1 && (
                <Pressable
                  onPress={() => movePlaceDown(index)}
                  className="p-2 bg-gray-200 rounded-lg active:opacity-70"
                >
                  <Text className="text-gray-700 font-bold">↓</Text>
                </Pressable>
              )}

              <Pressable
                onPress={() => removePlace(index)}
                className="p-2 bg-red-100 rounded-lg active:opacity-70"
              >
                <Trash2 color="#ef4444" size={16} />
              </Pressable>
            </View>
          </View>

          <View className="mb-3">
            <Text className="text-xs font-semibold text-gray-600 mb-1">Name</Text>
            <TextInput
              value={place.name}
              onChangeText={(text) => updatePlace(index, "name", text)}
              className="bg-white rounded-lg px-3 py-2 text-gray-900"
            />
          </View>

          <View className="mb-3">
            <Text className="text-xs font-semibold text-gray-600 mb-1">
              Description
            </Text>
            <TextInput
              value={place.description}
              onChangeText={(text) => updatePlace(index, "description", text)}
              multiline
              numberOfLines={2}
              className="bg-white rounded-lg px-3 py-2 text-gray-900"
            />
          </View>

          <View className="flex-row gap-2 mb-3">
            <View className="flex-1">
              <Text className="text-xs font-semibold text-gray-600 mb-1">
                Start Time
              </Text>
              <TextInput
                value={place.startTime}
                onChangeText={(text) => updatePlace(index, "startTime", text)}
                placeholder="10:00"
                className="bg-white rounded-lg px-3 py-2 text-gray-900 text-sm"
              />
            </View>
            <View className="flex-1">
              <Text className="text-xs font-semibold text-gray-600 mb-1">
                End Time
              </Text>
              <TextInput
                value={place.endTime}
                onChangeText={(text) => updatePlace(index, "endTime", text)}
                placeholder="11:30"
                className="bg-white rounded-lg px-3 py-2 text-gray-900 text-sm"
              />
            </View>
            <View className="flex-1">
              <Text className="text-xs font-semibold text-gray-600 mb-1">
                Duration (min)
              </Text>
              <TextInput
                value={String(place.duration)}
                onChangeText={(text) =>
                  updatePlace(index, "duration", Number(text) || 0)
                }
                keyboardType="numeric"
                className="bg-white rounded-lg px-3 py-2 text-gray-900 text-sm"
              />
            </View>
          </View>

          <View className="mb-3">
            <Text className="text-xs font-semibold text-gray-600 mb-1">
              Estimated Cost (som)
            </Text>
            <TextInput
              value={String(place.estimatedCost)}
              onChangeText={(text) =>
                updatePlace(index, "estimatedCost", Number(text) || 0)
              }
              keyboardType="numeric"
              className="bg-white rounded-lg px-3 py-2 text-gray-900"
            />
          </View>

          <View className="mb-3">
            <Text className="text-xs font-semibold text-gray-600 mb-1">Tips</Text>
            <TextInput
              value={place.tips ?? ""}
              onChangeText={(text) => updatePlace(index, "tips", text)}
              multiline
              numberOfLines={2}
              className="bg-white rounded-lg px-3 py-2 text-gray-900"
            />
          </View>

          <View>
            <Text className="text-xs font-semibold text-gray-600 mb-1">
              Photo Spot
            </Text>
            <TextInput
              value={place.photoSpot ?? ""}
              onChangeText={(text) => updatePlace(index, "photoSpot", text)}
              multiline
              numberOfLines={2}
              className="bg-white rounded-lg px-3 py-2 text-gray-900"
            />
          </View>
        </View>
      ))}
    </View>
  );
}
