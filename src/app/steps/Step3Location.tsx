import { Check, MapPin } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const cities = [
  { id: "bishkek", label: "Бишкек" },
  { id: "issyk-kul", label: "Иссык-Куль" },
  { id: "karakol", label: "Каракол" },
  { id: "osh", label: "Ош" },
  { id: "naryn", label: "Нарын" },
];

interface StepProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
  onNext: () => void;
}

export default function Step3Location({
  formData,
  updateFormData,
  onNext,
}: StepProps) {
  const handleSelect = (cityId: string) => {
    updateFormData("location", cityId);
  };

  const canProceed = formData.location !== null;

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-5 pt-5">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Где планируешь?
        </Text>
        <Text className="text-base text-gray-600 mb-8">
          Выбирай город для маршрута
        </Text>

        <View className="gap-3">
          {cities.map((city) => (
            <LocationCard
              key={city.id}
              city={city}
              isSelected={formData.location === city.id}
              onPress={() => handleSelect(city.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View className="p-5">
        <TouchableOpacity
          className={`py-4 rounded-xl items-center ${
            canProceed ? "bg-blue-500" : "bg-gray-300"
          }`}
          onPress={onNext}
          disabled={!canProceed}
          style={{
            backgroundColor: canProceed ? "#4A90E2" : "#D1D5DB",
          }}
        >
          <Text className="text-white text-base font-semibold">Далее</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface LocationCardProps {
  city: { id: string; label: string };
  isSelected: boolean;
  onPress: () => void;
}

function LocationCard({ city, isSelected, onPress }: LocationCardProps) {
  return (
    <TouchableOpacity
      className="bg-white rounded-2xl p-5 flex-row items-center justify-between border-2"
      style={{
        borderColor: isSelected ? "#2E5BFF" : "#E5E7EB",
        backgroundColor: isSelected ? "#EDF2FF" : "#FFFFFF",
      }}
      onPress={onPress}
    >
      <View className="flex-row items-center flex-1">
        <View
          className="w-10 h-10 rounded-full items-center justify-center mr-4"
          style={{ backgroundColor: isSelected ? "#4A90E220" : "#F3F4F6" }}
        >
          <MapPin size={20} color={isSelected ? "#4A90E2" : "#9CA3AF"} />
        </View>

        <Text
          className={`text-base font-medium ${
            isSelected ? "text-blue-500" : "text-gray-900"
          }`}
        >
          {city.label}
        </Text>
      </View>

      {isSelected && (
        <View className="w-6 h-6 rounded-full bg-blue-500 items-center justify-center">
          <Check size={16} color="#fff" />
        </View>
      )}
    </TouchableOpacity>
  );
}
