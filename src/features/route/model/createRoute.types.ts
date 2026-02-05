export type FormData = {
  companions: "alone" | "couple" | "family" | "company" | null;
  transportation: "walking" | "car" | "taxi" | "public" | null;
  timeAvailable: "2-3hours" | "half-day" | "fullday" | "weekend" | null;
  location: "bishkek" | "issyk-kul" | "karakol" | "osh" | "naryn" | null;
  budget: "economy" | "medium" | "comfort" | "unlimited" | null;
  preferences: string[];
};

export type CreateRoutePayload = {
  location: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  mood: string[];
  budget: number;
  companions: string;
  transportation: string;
  mode: "quick";
};
