import { api } from "@/src/shared/api/axiosInstance";
import { RouteType } from "../model/route.type";

export const fetchRoute = async (formData: RouteType) => {
  const res = await api.post("/routes/generate", formData);
  return res.data;
};

export const getRoutes = async () => {
  const res = await api.get("/routes");
  return res.data.data;
};
