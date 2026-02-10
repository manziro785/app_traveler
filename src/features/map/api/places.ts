import { api } from "@/src/shared/api/axiosInstance";
import type { Place } from "../model/place.type";

export const getPlaces = async (): Promise<Place[]> => {
  const res = await api.get("/places");
  return res.data.data;
};

