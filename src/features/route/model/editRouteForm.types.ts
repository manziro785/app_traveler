export type EditablePlace = {
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
};

export type EditRouteForm = {
  name: string;
  description: string;
  status: string;
  scheduledDate: string;
  scheduledTime: string;
  endTime: string;
  params: {
    mode: string;
    mood: string[];
    budget: string;
    duration: string;
    location: string;
    companions: string;
    transportation: string;
  };
  places: EditablePlace[];
};
