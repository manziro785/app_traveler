import { queryClient } from "@/src/app_core/lib/QueryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  createRoute,
  deleteRoute,
  editRoute,
  getRouteById,
  getRoutes,
} from "../api/route";
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
    mutationFn: (params: RouteType) => createRoute(params),
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

export const useEditRoute = (id: string) => {
  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["route", id] });
  };

  const handleError = (error: unknown) => {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(msg);
  };

  return useMutation({
    mutationFn: (id) => editRoute(id),
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const useDeleteRoute = () => {
  return useMutation({
    mutationFn: (id: string) => deleteRoute(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
      queryClient.removeQueries({ queryKey: ["routes", id] });
    },
  });
};

export const useGetRoutes = () => {
  return useQuery({
    queryKey: ["routes"],
    queryFn: getRoutes,
  });
};

export const useGetRouteById = (idRoute: string) => {
  return useQuery({
    queryKey: ["routes", idRoute],
    queryFn: async () => getRouteById(idRoute),
    enabled: !!idRoute,
  });
};
