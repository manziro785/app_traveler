import type { EditRoutePayload, RouteEntity } from "./route.type";
import type { EditRouteForm, EditablePlace } from "./editRouteForm.types";

export const initialEditRouteForm: EditRouteForm = {
  name: "",
  description: "",
  status: "",
  scheduledDate: "",
  scheduledTime: "",
  endTime: "",
  params: {
    mode: "",
    mood: [],
    budget: "",
    duration: "",
    location: "",
    companions: "",
    transportation: "",
  },
  places: [],
};

export function mapRouteToEditForm(route?: RouteEntity | null): EditRouteForm {
  if (!route) return initialEditRouteForm;

  return {
    name: route.name || "",
    description: route.description || "",
    status: route.status || "",
    scheduledDate: route.scheduledDate?.split("T")[0] || "",
    scheduledTime: route.scheduledTime || "",
    endTime: route.endTime || "",
    params: {
      mode: route.params?.mode || "",
      mood: route.params?.mood || [],
      budget: String(route.params?.budget || ""),
      duration: String(route.params?.duration || ""),
      location: route.params?.location || "",
      companions: route.params?.companions || "",
      transportation: route.params?.transportation || "",
    },
    places: (route.places as EditablePlace[]) || [],
  };
}

export function mapEditFormToPayload(form: EditRouteForm): EditRoutePayload {
  const scheduledDateISO = form.scheduledDate
    ? new Date(form.scheduledDate).toISOString()
    : null;

  return {
    name: form.name,
    description: form.description,
    status: form.status,
    scheduledDate: scheduledDateISO,
    scheduledTime: form.scheduledTime,
    endTime: form.endTime,
    params: {
      mode: form.params.mode,
      mood: form.params.mood,
      budget: Number(form.params.budget),
      duration: Number(form.params.duration),
      location: form.params.location,
      companions: form.params.companions,
      transportation: form.params.transportation,
    },
    places: form.places,
  };
}
