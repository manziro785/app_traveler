import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { LoginFormValues, loginSchema } from "../model/auth.schema";
import { mapLoginFormToDto } from "../model/mapAuth";
import { useAuth } from "../model/useAuth";

export function LoginForm() {
  const { submitLoginAuth, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: LoginFormValues) => {
    const dto = mapLoginFormToDto(values);
    await submitLoginAuth(dto);
  };

  return (
    <View className="gap-4">
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
      <View className="bg-white/20 rounded-2xl px-4 py-1 flex-row items-center">
        <Lock size={20} color="#E0F2FE" className="mr-3" />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              className="flex-1 text-white text-base pl-2"
              placeholder="Password"
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
      <TouchableOpacity className="items-end">
        <Text className="text-blue-100 text-sm">Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-white rounded-2xl py-4 w-full mt-4 shadow-lg flex flex-row justify-center items-center"
        activeOpacity={0.8}
        disabled={isLoading}
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-blue-600 text-lg font-semibold">
          {isLoading ? "Login..." : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
