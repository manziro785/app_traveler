export type StatsResponse = {
  visitedPlaces: number;
  totalRoutes: number;
  wishlistCount: number;
};

export type WeatherResponse = {
  weather: {
    temp: number;
    description?: string | null;
    main?: string | null;
    condition?: string | null;
    summary?: string | null;
  };
  recommendations: string;
  description?: string | null;
  condition?: string | null;
};

export type InsightItem = {
  id: string;
  category: string;
  title: string;
};
