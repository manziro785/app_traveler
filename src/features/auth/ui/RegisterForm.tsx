import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { RegisterFormValues, registerSchema } from "../model/auth.schema";
import { mapRegisterFormToDto } from "../model/mapAuth";
import { useAuth } from "../model/useAuth";

export function RegisterForm() {
  const { submitRegisterAuth, isLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreedToTerms: false,
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: RegisterFormValues) => {
    const dto = mapRegisterFormToDto(values);
    await submitRegisterAuth(dto);
  };

  return (
    <View className="gap-4">
      {/* Name */}
      <View className="bg-white/20 rounded-2xl px-4 py-1 flex-row items-center">
        <User size={20} color="#E0F2FE" className="mr-3" />
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              className="flex-1 text-white text-base pl-2"
              placeholder="Имя"
              placeholderTextColor="#BAE6FD"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </View>
      {!!errors.name?.message && (
        <Text className="text-red-200 -mt-2">{errors.name.message}</Text>
      )}

      {/* Email */}
      <View className="bg-white/20 rounded-2xl px-4 py-1 flex-row items-center">
        <Mail size={20} color="#E0F2FE" className="mr-3" />
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              className="flex-1 text-white text-base pl-2"
              placeholder="Email"
              placeholderTextColor="#BAE6FD"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
      </View>
      {!!errors.email?.message && (
        <Text className="text-red-200 -mt-2">{errors.email.message}</Text>
      )}

      {/* Password */}
      <View className="bg-white/20 rounded-2xl px-4 py-1 flex-row items-center">
        <Lock size={20} color="#E0F2FE" className="mr-3" />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              className="flex-1 text-white text-base pl-2"
              placeholder="Пароль"
              placeholderTextColor="#BAE6FD"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
          )}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((v) => !v)}
          hitSlop={10}
        >
          {showPassword ? (
            <EyeOff size={20} color="#BAE6FD" />
          ) : (
            <Eye size={20} color="#BAE6FD" />
          )}
        </TouchableOpacity>
      </View>
      {!!errors.password?.message && (
        <Text className="text-red-200 -mt-2">{errors.password.message}</Text>
      )}

      {/* Confirm Password */}
      <View className="bg-white/20 rounded-2xl px-4 py-1 flex-row items-center">
        <Lock size={20} color="#E0F2FE" className="mr-3" />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              className="flex-1 text-white text-base pl-2"
              placeholder="Подтверди пароль"
              placeholderTextColor="#BAE6FD"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />
          )}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword((v) => !v)}
          hitSlop={10}
        >
          {showConfirmPassword ? (
            <EyeOff size={20} color="#BAE6FD" />
          ) : (
            <Eye size={20} color="#BAE6FD" />
          )}
        </TouchableOpacity>
      </View>
      {!!errors.confirmPassword?.message && (
        <Text className="text-red-200 -mt-2">
          {errors.confirmPassword.message}
        </Text>
      )}

      {/* Terms */}
      <Controller
        control={control}
        name="agreedToTerms"
        render={({ field: { value, onChange } }) => (
          <TouchableOpacity
            className="flex-row items-start mt-2"
            onPress={() => onChange(!value)}
            activeOpacity={0.9}
          >
            <View
              className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center mt-0.5 ${
                value ? "bg-white border-white" : "border-white/60"
              }`}
            >
              {value && <View className="w-2.5 h-2.5 bg-blue-600 rounded-sm" />}
            </View>
            <Text className="flex-1 text-white text-sm">
              Я согласен с{" "}
              <Text className="underline">условиями использования</Text> и{" "}
              <Text className="underline">политикой конфиденциальности</Text>
            </Text>
          </TouchableOpacity>
        )}
      />
      {!!errors.agreedToTerms?.message && (
        <Text className="text-red-200 -mt-2">
          {errors.agreedToTerms.message}
        </Text>
      )}

      {/* Submit */}
      <TouchableOpacity
        className="bg-white rounded-2xl py-4 w-full mt-4 shadow-lg flex flex-row justify-center items-center"
        activeOpacity={0.8}
        disabled={isLoading}
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-blue-600 text-lg font-semibold">
          {isLoading ? "Создаём..." : "Создать аккаунт"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
