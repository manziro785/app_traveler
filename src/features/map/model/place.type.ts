export type Place = {
  id: string;
  name: string;
  slug?: string | null;
  description?: string | null;
  categoryId?: string | null;
  lat: number;
  lng: number;
  address?: string | null;
  photos?: string[] | null;
  priceRange?: string | null;
  rating?: number | null;
  openingHours?: string | null;
  phone?: string | null;
  website?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  category?: unknown | null;
};

