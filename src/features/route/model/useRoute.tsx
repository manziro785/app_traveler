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
import { EditRoutePayload, RouteEntity, RouteType } from "./route.type";

export const useRouteCreate = () => {
  const router = useRouter();

  const handleSuccess = (data: RouteEntity) => {
    queryClient.invalidateQueries({ queryKey: ["route"] });
    if (data?.id) {
      router.push(`/route/${data.id}`);
    } else {
      router.push("/(tabs)/route");
    }
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
    mutationFn: (params: EditRoutePayload) => editRoute(id, params),
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const useDeleteRoute = () => {
  return useMutation({
    mutationFn: (idRoute: string) => deleteRoute(idRoute),
    onSuccess: (_data, idRoute) => {
      queryClient.invalidateQueries({ queryKey: ["route"] });
      queryClient.removeQueries({ queryKey: ["route", idRoute] });
    },
  });
};

export const useGetRoutes = () => {
  return useQuery<RouteEntity[]>({
    queryKey: ["route"],
    queryFn: getRoutes,
  });
};

export const useGetRouteById = (idRoute: string) => {
  return useQuery<RouteEntity>({
    queryKey: ["route", idRoute],
    queryFn: async () => getRouteById(idRoute),
    enabled: !!idRoute,
  });
};
