import {
  BUDGET_MAP,
  COMPANIONS_MAP,
  LOCATION_MAP,
  TIME_MAP,
  TRANSPORT_MAP,
} from "./createRoute.maps";
import type { CreateRoutePayload, FormData } from "./createRoute.types";

export const getTodayISO = () => new Date().toISOString().split("T")[0];

export function buildCreateRoutePayload(form: FormData): CreateRoutePayload {
  return {
    location: LOCATION_MAP[form.location ?? "bishkek"],
    scheduledDate: getTodayISO(),
    scheduledTime: "10:00",
    duration: TIME_MAP[form.timeAvailable ?? "half-day"],
    mood: form.preferences.length ? form.preferences : ["relaxation"],
    budget: BUDGET_MAP[form.budget ?? "medium"],
    companions: COMPANIONS_MAP[form.companions ?? "alone"],
    transportation: TRANSPORT_MAP[form.transportation ?? "walking"],
    mode: "quick",
  };
}
