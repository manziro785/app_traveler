import { queryClient } from "@/src/app_core/lib/QueryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  editProfile,
  getProfile,
  getWishlist,
  postWishlist,
} from "../api/user";

export const useGetProfileQuery = () => {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: getProfile,
  });
};

export const useEditProfileMutation = () => {
  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["users", "me"] });
  };

  const handleError = (error: unknown) => {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(msg);
  };

  return useMutation({
    mutationFn: (formData) => editProfile(formData),
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const useGetWishlistQuery = () => {
  return useQuery({
    queryKey: ["users", "wishlist"],
    queryFn: getWishlist,
  });
};

export const usePostWishlistMutation = () => {
  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["users", "wishlist"] });
  };

  const handleError = (error: unknown) => {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(msg);
  };

  return useMutation({
    mutationFn: (formData) => postWishlist(formData),
    onSuccess: handleSuccess,
    onError: handleError,
  });
};
