import type { LoginUser, RegisterUser } from "../model/auth.type";
import type { LoginFormValues, RegisterFormValues } from "./auth.schema";

export const mapRegisterFormToDto = (v: RegisterFormValues): RegisterUser => ({
  name: v.name,
  email: v.email,
  password: v.password,
});

export const mapLoginFormToDto = (v: LoginFormValues): LoginUser => ({
  email: v.email,
  password: v.password,
});
