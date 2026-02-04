import ProgressBar from "@/src/features/components/shared/ProgressBar";
import React, { useState } from "react";
import { View } from "react-native";
import Step1WhoAndHow from "./steps/Step1WhoAndHow";
import Step2TimeAvailable from "./steps/Step2TimeAvailable";
import Step3Location from "./steps/Step3Location";
import Step4Budget from "./steps/Step4Budget";
import Step5Preferences from "./steps/Step5Preferences";

interface FormData {
  travelWith: string | null;
  transportType: string | null;
  timeAvailable: string | null;
  location: string | null;
  budget: string | null;
  preferences: string[];
}

export default function CreateRoute({ navigation }: any) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    travelWith: null,
    transportType: null,
    timeAvailable: null,
    location: null,
    budget: null,
    preferences: [],
  });

  const totalSteps = 5;

  const updateFormData = (key: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Final data:", formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    const stepProps = {
      formData,
      updateFormData,
      onNext: handleNext,
    };

    switch (currentStep) {
      case 1:
        return <Step1WhoAndHow {...stepProps} />;
      case 2:
        return <Step2TimeAvailable {...stepProps} />;
      case 3:
        return <Step3Location {...stepProps} />;
      case 4:
        return <Step4Budget {...stepProps} />;
      case 5:
        return <Step5Preferences {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ProgressBar
        currentStep={currentStep}
        totalSteps={totalSteps}
        onBack={handleBack}
      />
      {renderStep()}
    </View>
  );
}
