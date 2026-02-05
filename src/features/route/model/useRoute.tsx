import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { fetchRoute, getRoutes } from "../api/route";
import { RouteType } from "./route.type";

export const useRouteCreate = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/(tabs)/route");
  };

  const handleError = (error: unknown) => {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(msg);
  };

  const routeCreateMutation = useMutation({
    mutationFn: (params: RouteType) => fetchRoute(params),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const submitRoute = async (formData: RouteType) => {
    return routeCreateMutation.mutateAsync(formData);
  };

  return {
    submitRoute,
    isLoading: routeCreateMutation.isPending,
  };
};

const useGetRoutes = () => {
  return useQuery({
    queryKey: ["routes"],
    queryFn: getRoutes,
  });
};

export default useGetRoutes;
