import type { Place } from "@/src/shared/model/place.type";

export type Profile = {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string | null;
};

export type WishlistItem = {
  id: string;
  place?: Place | null;
  name?: string;
  photos?: string[] | null;
  address?: string | null;
};

export type EditProfilePayload = FormData | Record<string, unknown>;
