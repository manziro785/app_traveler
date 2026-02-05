import { useMemo, useState } from "react";
import { buildCreateRoutePayload } from "./createRoute.helpers";
import type { FormData } from "./createRoute.types";

const initialForm: FormData = {
  companions: null,
  transportation: null,
  timeAvailable: null,
  location: null,
  budget: null,
  preferences: [],
};

export function useCreateRouteFlow(totalSteps = 5) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const canNext = useMemo(() => {
    if (step === 1) return !!form.companions && !!form.transportation;
    if (step === 2) return !!form.timeAvailable;
    if (step === 3) return !!form.location;
    if (step === 4) return !!form.budget;
    if (step === 5) return form.preferences.length > 0; // можно сделать необязательным
    return false;
  }, [step, form]);

  const payload = useMemo(() => buildCreateRoutePayload(form), [form]);

  const next = () => setStep((s) => Math.min(totalSteps, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));
  const reset = () => {
    setStep(1);
    setForm(initialForm);
  };

  return {
    step,
    totalSteps,
    form,
    update,
    canNext,
    payload,
    next,
    back,
    reset,
  };
}
