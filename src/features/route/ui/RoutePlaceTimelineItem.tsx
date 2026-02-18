import type { RoutePlace } from "@/src/features/route/model/route.type";
import { ChevronDown, ChevronUp, Coffee, Lightbulb } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type IconComponentType = React.ComponentType<{ color?: string; size?: number }>;

type RoutePlaceTimelineItemProps = {
  item: RoutePlace;
  isLast: boolean;
  expanded: boolean;
  icon: IconComponentType;
  colorClass: string;
  onToggle: () => void;
};

export default function RoutePlaceTimelineItem({
  item,
  isLast,
  expanded,
  icon: IconComponent,
  colorClass,
  onToggle,
}: RoutePlaceTimelineItemProps) {
  return (
    <View className="flex-row mb-6">
      <View className="items-center mr-4">
        <View
          className={`w-12 h-12 ${colorClass} rounded-3xl items-center justify-center`}
        >
          <IconComponent color="#fff" size={24} />
        </View>
        {!isLast && <View className="w-0.5 h-full bg-gray-300 absolute top-12" />}
      </View>
      <View className="flex-1 bg-white rounded-xl p-4 shadow-sm">
        <Text className="text-base font-bold text-gray-900 mb-1 ">{item.name}</Text>
        <Text className="text-sm text-gray-600 mb-3">{item.description}</Text>

        <View className="flex-row justify-between">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="font-semibold text-gray-900"></Text>
            <Text className="text-xs text-gray-400">
              ± {item.startTime} - {item.endTime}
            </Text>
          </View>
          <TouchableOpacity
            onPress={onToggle}
            className="flex-row items-center gap-1 mb-2 justify-end"
          >
            {expanded ? (
              <ChevronDown color="#9ca3af" size={20} />
            ) : (
              <ChevronUp color="#9ca3af" size={20} />
            )}

            <Text className="text-sm text-gray-500">{expanded ? "close" : "show"}</Text>
          </TouchableOpacity>
        </View>
        {expanded && (
          <View>
            {item.photoSpot && (
              <Text className="text-sm text-gray-500 mb-2">{item.photoSpot}</Text>
            )}
            <View className="flex-row rounded-xl items-start flex-1 py-2 px-3 bg-[#FFF3D2]">
              <View className="w-10 h-10 items-center justify-center mr-3">
                <Lightbulb color="#EAB308" size={20} />
              </View>
              <View className="flex-1">
                <Text className="text-yellow-600 font-semibold text-sm mb-1">
                  {item.tips}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

export const fallbackPlaceIcon = Coffee;
