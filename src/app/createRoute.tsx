import { useCreateRouteFlow } from "@/src/features/route/model/useCreateRouteFlow";
import ProgressBar from "@/src/features/route/ui/ProgressBar";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouteCreate } from "../features/route/model/useRoute";
import Step1WhoAndHow from "./_steps/Step1WhoAndHow";
import Step2TimeAvailable from "./_steps/Step2TimeAvailable";
import Step3Location from "./_steps/Step3Location";
import Step4Budget from "./_steps/Step4Budget";
import Step5Preferences from "./_steps/Step5Preferences";

export default function CreateRoute() {
  const router = useRouter();
  const { submitRoute, isLoading } = useRouteCreate();
  const flow = useCreateRouteFlow(5);

  const handleBack = () => {
    if (flow.step > 1) flow.back();
    else router.back();
  };

  const handleNext = async () => {
    if (flow.step < flow.totalSteps) {
      flow.next();
      return;
    }

    try {
      await submitRoute(flow.payload);
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to create the route. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center px-5">
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text className="text-lg font-semibold text-gray-900 mt-4">
          Creating a route...
        </Text>
        <Text className="text-sm text-gray-500 mt-2 text-center">
          AI finds the perfect places for you
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50 -mt-14"
      edges={["top", "bottom"]}
    >
      <ProgressBar
        currentStep={flow.step}
        totalSteps={flow.totalSteps}
        onBack={handleBack}
      />

      {flow.step === 1 && (
        <Step1WhoAndHow
          form={flow.form}
          update={flow.update}
          onNext={handleNext}
        />
      )}
      {flow.step === 2 && (
        <Step2TimeAvailable
          form={flow.form}
          update={flow.update}
          onNext={handleNext}
        />
      )}
      {flow.step === 3 && (
        <Step3Location
          form={flow.form}
          update={flow.update}
          onNext={handleNext}
        />
      )}
      {flow.step === 4 && (
        <Step4Budget
          form={flow.form}
          update={flow.update}
          onNext={handleNext}
        />
      )}
      {flow.step === 5 && (
        <Step5Preferences
          form={flow.form}
          update={flow.update}
          onNext={handleNext}
        />
      )}
    </SafeAreaView>
  );
}
