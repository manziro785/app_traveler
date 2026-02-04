import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Eye, EyeOff, Lock, Mail, Mountain } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-white rounded-3xl items-center justify-center mb-6 shadow-lg">
            <Mountain color="#2563EB" size={34} strokeWidth={2.2} />
          </View>

          <Text className="text-white text-3xl font-bold mb-2">
            С возвращением!
          </Text>
          <Text className="text-blue-100 text-base">
            Войди, чтобы продолжить путешествие
          </Text>
        </View>

        <View className="gap-4">
          <View className="bg-white/20 rounded-2xl px-4 py-2 flex-row items-center backdrop-blur-lg">
            <Mail size={20} color="#E0F2FE" className="mr-8" />
            <TextInput
              className="flex-1 text-white text-base pl-4"
              placeholder="Email"
              placeholderTextColor="#BAE6FD"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View className="bg-white/20 rounded-2xl px-4 py-2 flex-row items-center backdrop-blur-lg">
            <Lock size={20} color="#E0F2FE" className="mr-3" />
            <TextInput
              className="flex-1 text-white text-base pl-4"
              placeholder="Пароль"
              placeholderTextColor="#BAE6FD"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff size={20} color="#BAE6FD" />
              ) : (
                <Eye size={20} color="#BAE6FD" />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="items-end">
            <Text className="text-blue-100 text-sm">Забыли пароль?</Text>
          </TouchableOpacity>
          <Link href="/(tabs)" asChild>
            <TouchableOpacity
              className="bg-white rounded-2xl py-3 w-full  shadow-lg flex flex-row justify-center items-center"
              activeOpacity={0.8}
            >
              <Text className="text-blue-600 text-lg font-semibold ">
                Войти
              </Text>
            </TouchableOpacity>
          </Link>

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
              <Text className="text-xs font-bold">G</Text>
            </View>
            <Text className="text-white text-base">
              Вход через аккаунт Google
            </Text>
          </TouchableOpacity>
          <View className="flex-row items-center justify-center mt-6">
            <Text className="text-blue-100 text-base">Еще нет аккаунта? </Text>
            <TouchableOpacity>
              <Link href="/register">
                <Text className="text-white text-base font-semibold">
                  Зарегистрироваться
                </Text>
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Login;
