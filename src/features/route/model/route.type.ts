export interface RouteType {
  location: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  mood: string[];
  budget: number;
  companions: string;
  transportation: string;
  mode: string;
}

export type EditRoutePayload = {
  name: string;
  description: string;
  status: string;
  scheduledDate: string | null;
  scheduledTime: string;
  endTime: string;
  params: {
    mode: string;
    mood: string[];
    budget: number;
    duration: number;
    location: string;
    companions: string;
    transportation: string;
  };
  places: {
    placeId: string;
    name: string;
    description: string;
    category?: string | null;
    startTime: string;
    endTime: string;
    duration: number;
    estimatedCost: number;
    tips?: string;
    photoSpot?: string;
    transportFromPrevious?: string | null;
  }[];
};

export type RouteParams = {
  location: string;
  duration: number;
  companions: string;
  budget: number;
  transportation: string;
  mode?: string;
  mood?: string[];
};

export type RoutePlace = {
  placeId: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  tips?: string;
  photoSpot?: string;
};

export type RouteEntity = {
  id: string;
  name: string;
  description: string;
  status: string;
  scheduledDate?: string | null;
  scheduledTime?: string | null;
  endTime?: string | null;
  params: RouteParams;
  places: RoutePlace[];
};
