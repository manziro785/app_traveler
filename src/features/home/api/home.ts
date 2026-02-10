import { api } from "@/src/shared/api/axiosInstance";
import type { InsightItem, StatsResponse, WeatherResponse } from "../model/home.type";

export const fetchInsights = async (): Promise<InsightItem[]> => {
  const res = await api.get("/insights/random");
  return res.data.data;
};

export const fetchWeather = async (): Promise<WeatherResponse> => {
  const res = await api.get("/weather/recommendations?lat=42.8746&lng=74.5698");
  return res.data.data;
};

export const fetchStats = async (): Promise<StatsResponse> => {
  const res = await api.get("/users/stats");
  return res.data.data;
};
