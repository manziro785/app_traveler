import { api } from "@/src/shared/api/axiosInstance";
import type { Place } from "@/src/shared/model/place.type";
import type { Profile, WishlistItem, EditProfilePayload } from "../model/profile.type";

export const getProfile = async (): Promise<Profile> => {
  const res = await api.get("/users/profile");
  return res.data.data;
};

export const editProfile = async (
  formData: EditProfilePayload,
): Promise<Profile> => {
  const res = await api.put("/users/profile", formData);
  return res.data.data;
};

export const getWishlist = async (): Promise<WishlistItem[]> => {
  const res = await api.get("/users/wishlist");
  return res.data.data;
};

export const postWishlist = async (
  formData: Record<string, unknown>,
): Promise<WishlistItem> => {
  const res = await api.post("/users/wishlist", formData);
  return res.data.data;
};

export const getPlaces = async (): Promise<Place[]> => {
  const res = await api.get("/places");
  return res.data.data;
};
