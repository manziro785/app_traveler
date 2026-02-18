import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";
import type { EditRouteForm, EditablePlace } from "./editRouteForm.types";
import {
  initialEditRouteForm,
  mapEditFormToPayload,
  mapRouteToEditForm,
} from "./editRouteForm.helpers";
import type { RouteEntity } from "./route.type";

export function useEditRouteForm(route?: RouteEntity | null) {
  const [formData, setFormData] = useState<EditRouteForm>(initialEditRouteForm);

  const syncFromRoute = useCallback((nextRoute?: RouteEntity | null) => {
    setFormData(mapRouteToEditForm(nextRoute));
  }, []);

  const payload = useMemo(() => mapEditFormToPayload(formData), [formData]);

  const setField = useCallback(<K extends keyof EditRouteForm>(field: K, value: EditRouteForm[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setParam = useCallback(
    <K extends keyof EditRouteForm["params"]>(
      field: K,
      value: EditRouteForm["params"][K],
    ) => {
      setFormData((prev) => ({
        ...prev,
        params: { ...prev.params, [field]: value },
      }));
    },
    [],
  );

  const addNewPlace = useCallback(() => {
    const newPlace: EditablePlace = {
      placeId: `place-${Date.now()}`,
      name: "",
      description: "",
      category: "Other",
      startTime: "",
      endTime: "",
      duration: 60,
      estimatedCost: 0,
      tips: "",
      photoSpot: "",
      transportFromPrevious: null,
    };

    setFormData((prev) => ({
      ...prev,
      places: [...prev.places, newPlace],
    }));
  }, []);

  const movePlaceUp = useCallback((index: number) => {
    if (index === 0) return;
    setFormData((prev) => {
      const next = [...prev.places];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return { ...prev, places: next };
    });
  }, []);

  const movePlaceDown = useCallback((index: number) => {
    setFormData((prev) => {
      if (index === prev.places.length - 1) return prev;
      const next = [...prev.places];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return { ...prev, places: next };
    });
  }, []);

  const removePlace = useCallback((index: number) => {
    Alert.alert("Remove Place", "Are you sure you want to remove this place?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          setFormData((prev) => ({
            ...prev,
            places: prev.places.filter((_, i) => i !== index),
          }));
        },
      },
    ]);
  }, []);

  const updatePlace = useCallback(
    <K extends keyof EditablePlace>(
      index: number,
      field: K,
      value: EditablePlace[K],
    ) => {
      setFormData((prev) => {
        const places = [...prev.places];
        places[index] = { ...places[index], [field]: value };
        return { ...prev, places };
      });
    },
    [],
  );

  return {
    formData,
    payload,
    setField,
    setParam,
    syncFromRoute,
    addNewPlace,
    movePlaceUp,
    movePlaceDown,
    removePlace,
    updatePlace,
  };
}
