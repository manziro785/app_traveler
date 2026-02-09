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
  console.log("Deleting route with ID:", idRoute);
  console.log("Full URL:", `/routes/${idRoute}`);
  const res = await api.delete(`/routes/${idRoute}`);
  return res.data.data;
};

export const editRoute = async (idRoute: string, params: RouteType) => {
  const res = await api.put(`/routes/${idRoute}`, params);
  return res.data.data;
};
