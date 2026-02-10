import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "../api/places";
import type { Place } from "./place.type";

export const useGetPlacesQuery = () => {
  return useQuery<Place[]>({
    queryKey: ["places"],
    queryFn: getPlaces,
  });
};
