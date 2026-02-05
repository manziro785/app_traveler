import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Имя минимум 2 символа"),
    email: z.string().email("Некорректный email"),
    password: z.string().min(6, "Пароль минимум 6 символов"),
    confirmPassword: z.string().min(6, "Подтверди пароль"),
    agreedToTerms: z
      .boolean()
      .refine((v) => v === true, "Нужно согласиться с условиями"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль минимум 6 символов"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
