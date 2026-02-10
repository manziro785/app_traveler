import React from "react";
import { View } from "react-native";

type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  rounded?: string;
  className?: string;
};

const roundedMap: Record<string, string> = {
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
  full: "rounded-full",
};

export const Skeleton = ({
  width = "100%",
  height = 12,
  rounded = "md",
  className = "",
}: SkeletonProps) => {
  return (
    <View
      className={`bg-gray-200 ${roundedMap[rounded] ?? "rounded-md"} ${className}`}
      style={{ width, height }}
    />
  );
};

