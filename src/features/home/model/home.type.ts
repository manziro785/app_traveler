export type StatsResponse = {
  visitedPlaces: number;
  totalRoutes: number;
  wishlistCount: number;
};

export type WeatherResponse = {
  weather: {
    temp: number;
  };
  recommendations: string;
};

export type InsightItem = {
  id: string;
  category: string;
  title: string;
};

