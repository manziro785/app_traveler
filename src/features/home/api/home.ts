import { api } from "@/src/shared/api/axiosInstance";

export const fetchInsights = async () => {
  const res = await api.get("/insights/random");
  return res.data.data;
};

export const fetchWeather = async () => {
  const res = await api.get("/weather/recommendations?lat=42.8746&lng=74.5698");
  return res.data.data;
};

export const fetchStats = async () => {
  const res = await api.get("/users/stats");
  return res.data.data;
};
