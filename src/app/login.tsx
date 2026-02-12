import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Mountain } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import GoogleForm from "../features/auth/ui/GoogleForm";
import { LoginForm } from "../features/auth/ui/LoginForm";

const Login = () => {
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
            Welcome back!
          </Text>
          <Text className="text-blue-100 text-base">
            Log in to continue your journey
          </Text>
        </View>

        <View className="gap-4">
          <LoginForm />
          <View className="flex-row items-center my-4">
            <View className="flex-1 h-px bg-white/30" />
            <Text className="text-white/60 mx-4 text-sm">or</Text>
            <View className="flex-1 h-px bg-white/30" />
          </View>
          <GoogleForm title_google="Login" />
          <View className="flex-row items-center justify-center mt-6">
            <Text className="text-blue-100 text-base">
              Don't have an account yet?
            </Text>
            <TouchableOpacity>
              <Link href="/register">
                <Text className="text-white text-base font-semibold">
                  Register
                </Text>
              </Link>
            </TouchableOpacity>
          </View>
        </View>

        {/* <Link href="/(tabs)" asChild>
          <TouchableOpacity>
            <Text>LC100</Text>
          </TouchableOpacity>
        </Link> */}
      </ScrollView>
    </LinearGradient>
  );
};

export default Login;
