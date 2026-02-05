import { useQuery } from "@tanstack/react-query";
import { fetchInsights, fetchStats, fetchWeather } from "../api/home";

export const useGetInsightsQuery = () => {
  return useQuery({
    queryKey: ["insights"],
    queryFn: fetchInsights,
  });
};

export const useGetWeatherQuery = () => {
  return useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
  });
};

export const useGetStatsQuery = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });
};
