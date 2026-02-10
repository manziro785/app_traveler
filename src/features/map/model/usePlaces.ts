import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "../api/places";

export const useGetPlacesQuery = () => {
  return useQuery({
    queryKey: ["places"],
    queryFn: getPlaces,
  });
};

