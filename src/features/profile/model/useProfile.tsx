import { queryClient } from "@/src/app_core/lib/QueryClient";
import type { Place } from "@/src/shared/types/place.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  editProfile,
  getPlaces,
  getProfile,
  getWishlist,
  postWishlist,
} from "../api/user";
import type { EditProfilePayload, Profile, WishlistItem } from "./profile.type";

export const useGetProfileQuery = () => {
  return useQuery<Profile>({
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
    mutationFn: (formData: EditProfilePayload) => editProfile(formData),
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export const useGetWishlistQuery = () => {
  return useQuery<WishlistItem[]>({
    queryKey: ["users", "wishlist"],
    queryFn: getWishlist,
  });
};

export const useGetPlacesQuery = () => {
  return useQuery<Place[]>({
    queryKey: ["places"],
    queryFn: getPlaces,
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
    mutationFn: (formData: Record<string, unknown>) => postWishlist(formData),
    onSuccess: handleSuccess,
    onError: handleError,
  });
};
