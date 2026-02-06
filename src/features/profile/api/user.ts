import { api } from "@/src/shared/api/axiosInstance";

export const getProfile = async () => {
  const res = await api.get("/users/profile");
  return res.data.data;
};

export const editProfile = async (formData) => {
  const res = await api.put("/users/profile", formData);
  return res.data.data;
};

export const getWishlist = async () => {
  const res = await api.get("/users/wishlist");
  return res.data.data;
};

export const postWishlist = async (formData) => {
  const res = await api.get("/users/wishlist", formData);
  return res.data.data;
};
