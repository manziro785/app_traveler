export const COMPANIONS_MAP = {
  alone: "solo",
  couple: "couple",
  family: "family",
  company: "friends",
} as const;

export const TRANSPORT_MAP = {
  walking: "walking",
  car: "car",
  taxi: "car",
  public: "public_transport",
} as const;

export const TIME_MAP = {
  "2-3hours": 180,
  "half-day": 240,
  fullday: 480,
  weekend: 960,
} as const;

export const LOCATION_MAP = {
  bishkek: "Bishkek",
  "issyk-kul": "Issyk-Kul",
  karakol: "Karakol",
  osh: "Osh",
  naryn: "Naryn",
} as const;

export const BUDGET_MAP = {
  economy: 500,
  medium: 1500,
  comfort: 3000,
  unlimited: 5000,
} as const;
