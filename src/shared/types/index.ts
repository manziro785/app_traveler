import type { FormData } from "@/src/features/route/model/createRoute.types";
import type { LucideIcon } from "lucide-react-native";

export type Option<TId extends string = string> = {
  id: TId;
  label: string;
  icon: LucideIcon;
};

export type StepProps = {
  form: FormData;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  onNext: () => void;
};
