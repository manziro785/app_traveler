import {
  useEditRoute,
  useGetRouteById,
} from "@/src/features/route/model/useRoute";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Plus, Save, Trash2 } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const EditRoute = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data, isLoading } = useGetRouteById(id as string);
  const { mutateAsync, isPending } = useEditRoute(id as string);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "",
    scheduledDate: "",
    scheduledTime: "",
    endTime: "",
    params: {
      mode: "",
      mood: [] as string[],
      budget: "",
      duration: "",
      location: "",
      companions: "",
      transportation: "",
    },
    places: [] as any[],
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        description: data.description || "",
        status: data.status || "",
        scheduledDate: data.scheduledDate?.split("T")[0] || "",
        scheduledTime: data.scheduledTime || "",
        endTime: data.endTime || "",
        params: {
          mode: data.params?.mode || "",
          mood: data.params?.mood || [],
          budget: String(data.params?.budget || ""),
          duration: String(data.params?.duration || ""),
          location: data.params?.location || "",
          companions: data.params?.companions || "",
          transportation: data.params?.transportation || "",
        },
        places: data.places || [],
      });
    }
  }, [data]);

  const handleSave = async () => {
    try {
      const scheduledDateISO = formData.scheduledDate
        ? new Date(formData.scheduledDate).toISOString()
        : null;

      await mutateAsync({
        name: formData.name,
        description: formData.description,
        status: formData.status,
        scheduledDate: scheduledDateISO,
        scheduledTime: formData.scheduledTime,
        endTime: formData.endTime,
        params: {
          mode: formData.params.mode,
          mood: formData.params.mood,
          budget: Number(formData.params.budget),
          duration: Number(formData.params.duration),
          location: formData.params.location,
          companions: formData.params.companions,
          transportation: formData.params.transportation,
        },
        places: formData.places,
      });
      router.back();
    } catch (error) {
      console.error("Error updating route:", error);
      Alert.alert("Error", "Failed to update route");
    }
  };

  const addNewPlace = () => {
    const newPlace = {
      placeId: `place-${Date.now()}`,
      name: "",
      description: "",
      category: "Other",
      startTime: "",
      endTime: "",
      duration: 60,
      estimatedCost: 0,
      tips: "",
      photoSpot: "",
      transportFromPrevious: null,
    };

    setFormData({
      ...formData,
      places: [...formData.places, newPlace],
    });
  };

  const movePlaceUp = (index: number) => {
    if (index === 0) return;
    const newPlaces = [...formData.places];
    [newPlaces[index - 1], newPlaces[index]] = [
      newPlaces[index],
      newPlaces[index - 1],
    ];
    setFormData({ ...formData, places: newPlaces });
  };

  const movePlaceDown = (index: number) => {
    if (index === formData.places.length - 1) return;
    const newPlaces = [...formData.places];
    [newPlaces[index], newPlaces[index + 1]] = [
      newPlaces[index + 1],
      newPlaces[index],
    ];
    setFormData({ ...formData, places: newPlaces });
  };

  const removePlace = (index: number) => {
    Alert.alert("Remove Place", "Are you sure you want to remove this place?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          const newPlaces = formData.places.filter((_, i) => i !== index);
          setFormData({ ...formData, places: newPlaces });
        },
      },
    ]);
  };

  const updatePlace = (index: number, field: string, value: any) => {
    const newPlaces = [...formData.places];
    newPlaces[index] = { ...newPlaces[index], [field]: value };
    setFormData({ ...formData, places: newPlaces });
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      <LinearGradient
        colors={["#1F83EB", "#0FAFD5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="pt-14 pb-6"
      >
        <View className="flex-row items-center justify-between px-4">
          <Pressable
            onPress={() => router.back()}
            className="p-2 active:opacity-70"
          >
            <ChevronLeft color="#fff" size={24} />
          </Pressable>
          <Text className="text-white text-xl font-bold">Edit Route</Text>
          <Pressable
            onPress={handleSave}
            disabled={isPending}
            className={`p-2 active:opacity-70 ${isPending ? "opacity-50" : ""}`}
          >
            <Save color="#fff" size={24} />
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-4 pt-6">
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
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, name: text }))
                }
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
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, description: text }))
                }
                placeholder="Describe your route"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base min-h-[80px]"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Status
              </Text>
              <TextInput
                value={formData.status}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, status: text }))
                }
                placeholder="SAVED, ACTIVE, COMPLETED"
                className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View className="flex-row gap-3 mb-4">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-700 mb-2">
                  Date
                </Text>
                <TextInput
                  value={formData.scheduledDate}
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, scheduledDate: text }))
                  }
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
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, scheduledTime: text }))
                  }
                  placeholder="10:00"
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            <View className="mb-0">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                End Time
              </Text>
              <TextInput
                value={formData.endTime}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, endTime: text }))
                }
                placeholder="13:00"
                className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <Text className="text-lg font-bold text-gray-900 mb-4">
              Parameters
            </Text>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Location *
              </Text>
              <TextInput
                value={formData.params.location}
                onChangeText={(text) =>
                  setFormData((prev) => ({
                    ...prev,
                    params: { ...prev.params, location: text },
                  }))
                }
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
                  onChangeText={(text) =>
                    setFormData((prev) => ({
                      ...prev,
                      params: { ...prev.params, budget: text },
                    }))
                  }
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
                  onChangeText={(text) =>
                    setFormData((prev) => ({
                      ...prev,
                      params: { ...prev.params, duration: text },
                    }))
                  }
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
                onChangeText={(text) =>
                  setFormData((prev) => ({
                    ...prev,
                    params: { ...prev.params, companions: text },
                  }))
                }
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
                onChangeText={(text) =>
                  setFormData((prev) => ({
                    ...prev,
                    params: { ...prev.params, transportation: text },
                  }))
                }
                placeholder="walking, car, public"
                className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Mode
              </Text>
              <TextInput
                value={formData.params.mode}
                onChangeText={(text) =>
                  setFormData((prev) => ({
                    ...prev,
                    params: { ...prev.params, mode: text },
                  }))
                }
                placeholder="quick, detailed"
                className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View className="mb-0">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Mood (comma separated)
              </Text>
              <TextInput
                value={formData.params.mood.join(", ")}
                onChangeText={(text) =>
                  setFormData((prev) => ({
                    ...prev,
                    params: {
                      ...prev.params,
                      mood: text.split(",").map((m) => m.trim()),
                    },
                  }))
                }
                placeholder="food, nature, shopping"
                className="bg-gray-50 rounded-xl px-4 py-3.5 text-gray-900 text-base"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

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
                <Text className="text-blue-600 font-semibold text-sm">
                  Add Place
                </Text>
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
                    <Text className="font-bold text-gray-900">
                      {place.category}
                    </Text>
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
                  <Text className="text-xs font-semibold text-gray-600 mb-1">
                    Name
                  </Text>
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
                    onChangeText={(text) =>
                      updatePlace(index, "description", text)
                    }
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
                      onChangeText={(text) =>
                        updatePlace(index, "startTime", text)
                      }
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
                      onChangeText={(text) =>
                        updatePlace(index, "endTime", text)
                      }
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
                        updatePlace(index, "duration", Number(text))
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
                      updatePlace(index, "estimatedCost", Number(text))
                    }
                    keyboardType="numeric"
                    className="bg-white rounded-lg px-3 py-2 text-gray-900"
                  />
                </View>

                <View className="mb-3">
                  <Text className="text-xs font-semibold text-gray-600 mb-1">
                    Tips
                  </Text>
                  <TextInput
                    value={place.tips}
                    onChangeText={(text) => updatePlace(index, "tips", text)}
                    multiline
                    numberOfLines={2}
                    className="bg-white rounded-lg px-3 py-2 text-gray-900"
                  />
                </View>

                <View className="mb-0">
                  <Text className="text-xs font-semibold text-gray-600 mb-1">
                    Photo Spot
                  </Text>
                  <TextInput
                    value={place.photoSpot}
                    onChangeText={(text) =>
                      updatePlace(index, "photoSpot", text)
                    }
                    multiline
                    numberOfLines={2}
                    className="bg-white rounded-lg px-3 py-2 text-gray-900"
                  />
                </View>
              </View>
            ))}
          </View>

          <Pressable
            onPress={handleSave}
            disabled={isPending}
            className={`bg-blue-500 rounded-xl py-4 items-center mb-6 active:opacity-80 shadow-lg ${
              isPending ? "opacity-50" : ""
            }`}
          >
            <Text className="text-white font-bold text-base">
              {isPending ? "Saving Changes..." : "Save All Changes"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditRoute;
