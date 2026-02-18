import {
  useEditRoute,
  useGetRouteById,
} from "@/src/features/route/model/useRoute";
import { useEditRouteForm } from "@/src/features/route/model/useEditRouteForm";
import EditRouteBasicSection from "@/src/features/route/ui/EditRouteBasicSection";
import EditRouteHeader from "@/src/features/route/ui/EditRouteHeader";
import EditRouteParamsSection from "@/src/features/route/ui/EditRouteParamsSection";
import EditRoutePlacesSection from "@/src/features/route/ui/EditRoutePlacesSection";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const EditRoute = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const routeId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();

  const { data, isLoading } = useGetRouteById(routeId ?? "");
  const { mutateAsync, isPending } = useEditRoute(routeId ?? "");

  const {
    formData,
    payload,
    setField,
    setParam,
    syncFromRoute,
    addNewPlace,
    movePlaceUp,
    movePlaceDown,
    removePlace,
    updatePlace,
  } = useEditRouteForm(data);

  useEffect(() => {
    syncFromRoute(data);
  }, [data, syncFromRoute]);

  const handleSave = async () => {
    try {
      await mutateAsync(payload);
      router.back();
    } catch (error) {
      console.error("Error updating route:", error);
      Alert.alert("Error", "Failed to update route");
    }
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
      <EditRouteHeader
        isPending={isPending}
        onBack={() => router.back()}
        onSave={handleSave}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-4 pt-6">
          <EditRouteBasicSection formData={formData} setField={setField} />
          <EditRouteParamsSection formData={formData} setParam={setParam} />
          <EditRoutePlacesSection
            formData={formData}
            addNewPlace={addNewPlace}
            movePlaceUp={movePlaceUp}
            movePlaceDown={movePlaceDown}
            removePlace={removePlace}
            updatePlace={updatePlace}
          />

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
