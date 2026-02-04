import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Mountain } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RegisterForm } from "../features/auth/ui/RegisterForm";

const Register = () => {
  return (
    <LinearGradient
      colors={["#1E40AF", "#06B6D4", "#22D3EE"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow justify-center px-6 py-12"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mb-8">
          <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center mb-6 shadow-lg">
            <Mountain color="#2563EB" size={28} strokeWidth={2.2} />
          </View>

          <Text className="text-white text-3xl font-bold mb-2">
            Создай аккаунт
          </Text>
          <Text className="text-blue-100 text-base">
            Начни свое путешествие с Nomad AI
          </Text>
        </View>

        <RegisterForm />

        <View className="flex-row items-center my-4">
          <View className="flex-1 h-px bg-white/30" />
          <Text className="text-white/60 mx-4 text-sm">или</Text>
          <View className="flex-1 h-px bg-white/30" />
        </View>

        <TouchableOpacity
          className="bg-gray-900/80 rounded-2xl py-4 flex-row items-center justify-center gap-3"
          activeOpacity={0.8}
        >
          <View className="w-5 h-5 bg-white rounded-full items-center justify-center">
            <Text className="text-xs">G</Text>
          </View>
          <Text className="text-white text-base">
            Регистрация с помощью Google
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-center mt-6">
          <Text className="text-blue-100 text-base">Уже есть аккаунт? </Text>
          <TouchableOpacity>
            <Link href="/login">
              <Text className="text-white text-base font-semibold">Войти</Text>
            </Link>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </ScrollView>
    </LinearGradient>
  );
};

export default Register;
