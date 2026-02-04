import type { RegisterUser } from "../model/auth.type";
import type { RegisterFormValues } from "./auth.schema";

export const mapRegisterFormToDto = (v: RegisterFormValues): RegisterUser => ({
  name: v.name,
  email: v.email,
  password: v.password,
});
