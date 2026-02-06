import { api } from "@/src/shared/api/axiosInstance";
import { RouteType } from "../model/route.type";

export const createRoute = async (formData: RouteType) => {
  const res = await api.post("/routes/generate", formData);
  return res.data;
};

export const getRoutes = async () => {
  const res = await api.get("/routes");
  return res.data.data;
};

export const getRouteById = async (idRoute: string) => {
  const res = await api.get(`/routes/${idRoute}`);
  return res.data.data;
};

export const deleteRoute = async (idRoute: string) => {
  const res = await api.delete(`/routes/${idRoute}`);
  return res.data.data;
};

export const editRoute = async (idRoute: string) => {
  const res = await api.put(`/routes/${idRoute}`);
  return res.data.data;
};
