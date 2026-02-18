import { api } from "@/src/shared/api/axiosInstance";
import { EditRoutePayload, RouteEntity, RouteType } from "../model/route.type";

export const createRoute = async (formData: RouteType): Promise<RouteEntity> => {
  const res = await api.post("/routes/generate", formData);
  return res.data;
};

export const getRoutes = async (): Promise<RouteEntity[]> => {
  const res = await api.get("/routes");
  return res.data.data;
};

export const getRouteById = async (idRoute: string): Promise<RouteEntity> => {
  const res = await api.get(`/routes/${idRoute}`);
  return res.data.data;
};

export const deleteRoute = async (idRoute: string): Promise<RouteEntity> => {
  console.log("Deleting route with ID:", idRoute);
  console.log("Full URL:", `/routes/${idRoute}`);
  const res = await api.delete(`/routes/${idRoute}`);
  return res.data.data;
};

export const editRoute = async (
  idRoute: string,
  params: EditRoutePayload,
): Promise<RouteEntity> => {
  const res = await api.put(`/routes/${idRoute}`, params);
  return res.data.data;
};
