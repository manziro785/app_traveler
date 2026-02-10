import { useQuery } from "@tanstack/react-query";
import { fetchInsights, fetchStats, fetchWeather } from "../api/home";
import type { InsightItem, StatsResponse, WeatherResponse } from "./home.type";

export const useGetInsightsQuery = () => {
  return useQuery<InsightItem[]>({
    queryKey: ["insights"],
    queryFn: fetchInsights,
  });
};

export const useGetWeatherQuery = () => {
  return useQuery<WeatherResponse>({
    queryKey: ["weather"],
    queryFn: fetchWeather,
  });
};

export const useGetStatsQuery = () => {
  return useQuery<StatsResponse>({
    queryKey: ["stats", "wishlist"],
    queryFn: fetchStats,
  });
};
